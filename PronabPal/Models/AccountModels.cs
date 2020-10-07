using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Globalization;
using System.Web.Security;

namespace PronabPal.Models
{
    public class SignUpModel
    {
        [Display(Name = "UserId")]
        public string UserId { get; set; }

        [Display(Name = "UserName")]
        public string UserName { get; set; }

        [Required]
        [Display(Name = "FirstName")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "LastName")]
        public string LastName { get; set; }

        [Required]
        [RegularExpression(@"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z",
        ErrorMessage = "Please enter correct email address")]
        [Display(Name = "EmailId")]
        public string EmailId { get; set; }

        [Required]
        [Display(Name = "Phone No.")]
        public string Phone { get; set; }

        [Required]
        [Display(Name = "Password")]
        [StringLength(int.MaxValue, MinimumLength = 6, ErrorMessage = "Please enter a password minimum 6 characters")]
        public string Password { get; set; }

        [Required]
        [Display(Name = "Confirm Passwrod")]
        [Compare("Password", ErrorMessage = "Password Do not Match")]
        public string ConfirmPassword { get; set; }

        [Display(Name = "Lat")]
        public string Lat { get; set; }

        [Display(Name = "Lng")]
        public string Lng { get; set; }

       
        [Display(Name = "Address")]
        public string Address { get; set; }

    }

    public class User_LoginModel
    {
        [Required]
        [Display(Name = "EmailId")]
        public string EmailId { get; set; }

        [Required]
        [Display(Name = "Password")]
        public string Password { get; set; }

        public bool RememberMe { get; set; }
    }

    public class ChangeUserPasswordModel
    {
        [Display(Name = "User_Id")]
        public string User_Id { get; set; }

        [Required]
        [Display(Name = "Old Password")]
        public string Password { get; set; }

        [Display(Name = "New Password")]
        [StringLength(50, MinimumLength = 6, ErrorMessage = "Password length must be greater than 5 Characters!")]
        [DataType(DataType.Password)]
        [Required]
        public string newPass { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 6, ErrorMessage = "Password length must be greater than 5 Characters!")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm New password")]
        [Compare("newPass", ErrorMessage = "Password do not match! Retype password !")]
        public string Confirm_Password { get; set; }
    }
    
    public class ProfileEditModel
    {

        //[Required]
        [Display(Name = "UserId")]
        public string UserId { get; set; }

        // [Required]
        [Display(Name = "UserName")]
        public string UserName { get; set; }

        [Required]
        [Display(Name = "FirstName*")]
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "LastName*")]
        public string LastName { get; set; }

        [Required]
        [RegularExpression(@"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z",
           ErrorMessage = "Please enter correct email address")]
        [Display(Name = "EmailId*")]
        public string EmailId { get; set; }

        [Required]
        [Display(Name = "Phone*")]
        public string Phone { get; set; }

        [Display(Name = "ProfileImage")]
        public string ProfileImage { get; set; }

        [Display(Name = "Lat")]
        public string Lat { get; set; }

        [Display(Name = "Long")]
        public string Lng { get; set; }

        [Display(Name = "UserType")]
        public string UserType { get; set; }

       
        [Display(Name = "Address*")]
        public string Address { get; set; }

        [Display(Name = "City")]
        public string City { get; set; }

        [Display(Name = "State")]
        public string State { get; set; }

        [Display(Name = "Country")]
        public string Country { get; set; }

        [Display(Name = "PostCode")]
        public string PostCode { get; set; }

        [Display(Name = "CCode")]
        public string CCode { get; set; }

        [Display(Name = "DOB")]
        public string DOB { get; set; }

        [Display(Name = "Gender")]
        public string Gender { get; set; }

        [Display(Name = "Detail")]
        public string Detail { get; set; }
    }
    
    //=================================Forgot-Password====================

    public class ForgetPassword
    {
        [Required(ErrorMessage = "Please enter an email address")]
        [EmailAddress(ErrorMessage = "Email is not an valid email address")]
        public string Email { get; set; }

        public string Password { get; set; }

        [Display(Name = "User Id")]
        public string User_Id { get; set; }

        [Display(Name = "FirstName")]
        public string FirstName { get; set; }

        [Display(Name = "LastName")]
        public string LastName { get; set; }
    }

    public class ResetPassword
    {
        [Display(Name = "Email")]
        //[EmailAddress(ErrorMessage = "Email is not an valid email address")]
        public string Email { get; set; }

        [Required]
        [Display(Name = "Password")]
        [StringLength(int.MaxValue, MinimumLength = 6, ErrorMessage = "Please enter a password minimum 6 characters")]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        //[Required]
        [StringLength(int.MaxValue, MinimumLength = 6, ErrorMessage = "Please enter a password minimum 6 characters")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "Password do not match! retype password !")]
        public string Confirm_Password { get; set; }

        [Display(Name = "User Id")]
        public string User_Id { get; set; }
    }
    
    public class SpotModel
    {
        [Display(Name = "Spot Id")]
        public string SpotId { get; set; }

        [Display(Name = "Category Id")]
        public string CategoryId { get; set; }

        [Display(Name = "Dictum Id")]
        public string DictumId { get; set; }
        
        [Required]
        [Display(Name = "Spot Name")]
        public string SpotName { get; set; }

        [Required]
        [Display(Name = "Spot Type")]
        public string SpotType { get; set; }
        
        [Display(Name = "Description")]
        public string Description { get; set; }

        [Display(Name = "Canvas Sketch")]
        public string CanvasSketch { get; set; }

        [Display(Name = "Image")]
        public string Image { get; set; }

    }


    public class FlowModel
    {
        [Display(Name = "dictum Id")]
        public string dictumID { get; set; }

        [Required]
        [Display(Name = "Phrase")]
        public string Phrase { get; set; }

        [Display(Name = "Description")]
        public string Description { get; set; }

    }
}
