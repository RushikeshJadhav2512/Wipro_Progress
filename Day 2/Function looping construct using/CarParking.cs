using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace Day2_Functions_Looping_constructs
{
    internal class CarParking // camelcasing is used for class names in C#
                              //for variablenames we use lower camel casing
                              //pascal casing for method names ex CalculateCharges
                              //snake casing is not used in C# ex my_variable_name python   
    {
        //Step 1: Initialize parking with the help of for loop
        //Step 2: parking vehicles
        //Step 3: exit vehicles
        //Step 4: calculate charges based on vehicle type
        //step 5: Keeping the application running until the user exits.

        int totalSlots = 10;
        bool[] parkingSlots; // array to represent parking slots
        int choice;
        public CarParking() // constructor that initializes parking slots using for loop
        {
            parkingSlots = new bool[totalSlots];
            for (int i = 0; i < totalSlots; i++)
            {
                parkingSlots[i] = false; // false indicates slot is empty
            }

        }
        void ParkVehichle() // function to park vehicle
        {
            Console.WriteLine("Enter vehicle type (1 for Car, 2 for Bike): ");
            int vehicleType = int.Parse(Console.ReadLine());
            int slotIndex = -1;
            for (int i = 0; i < totalSlots; i++)
            {
                if (!parkingSlots[i])
                {
                    slotIndex = i;
                    parkingSlots[i] = true; // mark slot as occupied
                    break;
                }
            }
            if (slotIndex != -1)
            {
                Console.WriteLine($"Vehicle parked in slot {slotIndex + 1}");
            }
            else
            {
                Console.WriteLine("Parking is full!");
            }
        }

        void ExitVehicle() // function to exit vehicle
        {
            Console.WriteLine("Enter slot number to exit vehicle: ");
            int slotNumber = int.Parse(Console.ReadLine());
            if (slotNumber >= 1 && slotNumber <= totalSlots && parkingSlots[slotNumber - 1])
            {
                parkingSlots[slotNumber - 1] = false; // mark slot as empty
                Console.WriteLine($"Vehicle exited from slot {slotNumber}");
            }
            else
            {
                Console.WriteLine("Invalid slot number or slot is already empty!");
            }
        }

        public void Run() // main function to run the parking application
        {
            do // exitcontrolled loop where user can exit the application after performing operations
            {
                Console.WriteLine("Car Parking System");
                Console.WriteLine("1. Park Vehicle");
                Console.WriteLine("2. Exit Vehicle");
                Console.WriteLine("3. Exit Application");
                Console.Write("Enter your choice: ");
                choice = int.Parse(Console.ReadLine());
                switch (choice)
                {
                    case 1:
                        ParkVehichle();
                        break;
                    case 2:
                        ExitVehicle();
                        break;
                    case 3:
                        Console.WriteLine("Exiting application...");
                        break;
                    default:
                        Console.WriteLine("Invalid choice! Please try again.");
                        break;
                }
            } while (choice != 3);
        }
    }

}


//While is entry controlled loop here condition is checked first then loop body is executed
//Do while is exit controlled loop here loop body is executed first then condition is checked
//Foreach loop is used to iterate over a collection or array irrespective of index and condition
//for loop is used when number of iterations is known or definite from the start till end with increment or decrement
//switch case is used when multiple conditions are to be checked based on user input or variable value