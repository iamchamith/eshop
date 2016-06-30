using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using AutoMapper;
namespace Test
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {

            var x = new User
            {
                Id = 1,
                Name = "gayan"
            };

          
           

        }
    }

    public class Employee {

        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class User
    {

        public int Id { get; set; }
        public string Name { get; set; }
    }
}
