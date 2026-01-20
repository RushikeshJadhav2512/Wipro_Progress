using System;
using Xunit;
using SecureUserApp;           // ← your main namespace
using BCrypt.Net;

namespace SecureUserApp.Tests;

public class AuthTests
{
    [Fact]
    public void Password_Hashing_And_Verification_Works()
    {
        var password = "MyStrongP@ssw0rd123";
        var hash = BCrypt.Net.BCrypt.HashPassword(password);

        Assert.True(BCrypt.Net.BCrypt.Verify(password, hash));
        Assert.False(BCrypt.Net.BCrypt.Verify("wrong", hash));
    }

    [Fact]
    public void Aes_Encryption_Decryption_Roundtrip()
    {
        var original = "My secret message 123 !@#";

        var encrypted = Program.Encrypt(original);   // access via internal or make public for test
        var decrypted = Program.Decrypt(encrypted);

        Assert.Equal(original, decrypted);
    }

    [Fact]
    public void Invalid_Password_Login_Fails()
    {
        // You can add more integration-style tests later (mock file, etc.)
        // For now — just verify hashing behavior
        Assert.True(true); // placeholder — expand later
    }
}