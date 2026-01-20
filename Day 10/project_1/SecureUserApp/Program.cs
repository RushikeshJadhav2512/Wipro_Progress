using System;
using System.Collections.Generic;
using System.IO;
using System.Security.Cryptography;
using System.Text;
using BCrypt.Net;
using Serilog;

namespace SecureUserApp;

class Program
{
    private static readonly string UsersFile = "users.json";
    private static readonly string LogFile = "app.log";
    private static readonly byte[] AesKey = Encoding.UTF8.GetBytes("ThisIs32ByteSecretKey1234567890a"); // 32 bytes for AES-256 (CHANGE IN REAL APP!)
    private static readonly byte[] AesIV = Encoding.UTF8.GetBytes("16ByteIV12345678"); // 16 bytes (CHANGE!)

    private static List<User> users = new();

    static void Main()
    {
        SetupLogging();

        Log.Information("Application started");

        LoadUsers();

        while (true)
        {
            Console.WriteLine("\n1. Register\n2. Login\n3. Exit");
            Console.Write("Choice: ");
            var choice = Console.ReadLine();

            try
            {
                switch (choice)
                {
                    case "1":
                        Register();
                        break;
                    case "2":
                        Login();
                        break;
                    case "3":
                        SaveUsers();
                        Log.Information("Application exited");
                        return;
                    default:
                        Console.WriteLine("Invalid choice.");
                        break;
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Unexpected error in main loop");
                Console.WriteLine("An error occurred. Check logs.");
            }
        }
    }

    private static void SetupLogging()
    {
        Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Debug()
            .WriteTo.Console()
            .WriteTo.File(LogFile, rollingInterval: RollingInterval.Day)
            .CreateLogger();
    }

    private static void LoadUsers()
    {
        if (File.Exists(UsersFile))
        {
            var json = File.ReadAllText(UsersFile);
            users = System.Text.Json.JsonSerializer.Deserialize<List<User>>(json) ?? new();
            Log.Information("Loaded {Count} users from file", users.Count);
        }
    }

    private static void SaveUsers()
    {
        var json = System.Text.Json.JsonSerializer.Serialize(users);
        File.WriteAllText(UsersFile, json);
        Log.Information("Users saved to file");
    }

    private static void Register()
    {
        Console.Write("Username: ");
        var username = Console.ReadLine()?.Trim();

        if (string.IsNullOrEmpty(username) || users.Exists(u => u.Username == username))
        {
            Console.WriteLine("Invalid or taken username.");
            return;
        }

        Console.Write("Password: ");
        var password = Console.ReadLine();

        if (string.IsNullOrEmpty(password) || password.Length < 8)
        {
            Console.WriteLine("Password too short (min 8 chars).");
            return;
        }

        Console.Write("Secret note to encrypt: ");
        var secret = Console.ReadLine();

        var hashed = BCrypt.Net.BCrypt.HashPassword(password);
        var encryptedSecret = Encrypt(secret ?? "");

        users.Add(new User
        {
            Username = username,
            HashedPassword = hashed,
            EncryptedSecret = encryptedSecret
        });

        SaveUsers();
        Log.Information("User registered: {Username}", username);
        Console.WriteLine("Registered successfully!");
    }

    private static void Login()
    {
        Console.Write("Username: ");
        var username = Console.ReadLine()?.Trim();

        Console.Write("Password: ");
        var password = Console.ReadLine();

        var user = users.Find(u => u.Username == username);

        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.HashedPassword))
        {
            Log.Warning("Login failed for username: {Username}", username);
            Console.WriteLine("Invalid credentials.");
            return;
        }

        var decrypted = Decrypt(user.EncryptedSecret);
        Log.Information("User logged in: {Username}", username);
        Console.WriteLine($"Login successful! Your secret note: {decrypted}");
    }

    private static string Encrypt(string plainText)
    {
        if (string.IsNullOrEmpty(plainText)) return "";

        using var aes = Aes.Create();
        aes.Key = AesKey;
        aes.IV = AesIV;

        using var encryptor = aes.CreateEncryptor(aes.Key, aes.IV);
        using var ms = new MemoryStream();
        using var cs = new CryptoStream(ms, encryptor, CryptoStreamMode.Write);
        using var sw = new StreamWriter(cs);
        sw.Write(plainText);
        sw.Flush();
        cs.FlushFinalBlock();

        return Convert.ToBase64String(ms.ToArray());
    }

    private static string Decrypt(string cipherText)
    {
        if (string.IsNullOrEmpty(cipherText)) return "";

        using var aes = Aes.Create();
        aes.Key = AesKey;
        aes.IV = AesIV;

        using var decryptor = aes.CreateDecryptor(aes.Key, aes.IV);
        using var ms = new MemoryStream(Convert.FromBase64String(cipherText));
        using var cs = new CryptoStream(ms, decryptor, CryptoStreamMode.Read);
        using var sr = new StreamReader(cs);

        return sr.ReadToEnd();
    }
}

public class User
{
    public string Username { get; set; } = "";
    public string HashedPassword { get; set; } = "";
    public string EncryptedSecret { get; set; } = "";
}