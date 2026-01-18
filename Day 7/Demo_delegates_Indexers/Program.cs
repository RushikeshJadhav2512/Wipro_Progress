using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Demo_delegates_Indexers_properties
{
    
    internal class Program
    {
        //Indexers:  An indexers allows an object to accesed like an array using [] ex obj[index]
        //Attributes: It is usd for adding metadata - to code element as
        //Classes
        //methods
        //properties
        //Parameters
        //This metadata is read at run time using reflection

        //        | Type        | Example                        |
        //| ----------- | ------------------------------ |
        //| Built-in    | `[Obsolete]`, `[Serializable]` |
        //| Custom      | `[Role]`, `[Audit]`            |
        //| Conditional | `[Conditional]`                |

        //Why Attributes ar used ?
        //Declarative programming
        //Separation of concerns
        //Configuration without code changes
        //Used heavily in frameworks(.NET, ASP.NET, EF)


        [Obsolete("use new methpod instead")]
        static void OldMethodforDisplayingData()
        {
            Console.WriteLine(  "very old method of diapying inforamation ");
        }
        static void Main(string[] args)
        {
            StudentMarks myStudents = new StudentMarks();
            myStudents[0] = 90;
            myStudents[1] = 100;
            myStudents[2] = 200;
            myStudents[3] = 160;

            Console.WriteLine("student marks are ");
            Console.WriteLine(myStudents[0]);
            Console.WriteLine(myStudents[1]);
            Console.WriteLine(myStudents[2]);
            Console.WriteLine(myStudents[3]);

        }
    }

    class StudentMarks 
    {
        private int[] marks = new int[5];
        //indexr

        public int this[int index] 
        { get { return marks[index];
        } 
         set { marks[index] = value; } 
        }
    }
}
