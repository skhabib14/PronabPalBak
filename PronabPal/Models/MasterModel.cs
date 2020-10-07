using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace PronabPal.Models
{
    public class MasterModel
    {
        public class Maincategory
        {
            public string CategoryId { get; set; }

            [Required(ErrorMessage = "Name is required")]
            public string CategoryName { get; set; }

            public string Image { get; set; }
        }
    }
}