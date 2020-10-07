using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Models
{
    public class AdminModels
    {
        public class AdminProfile
        {
            [Display(Name = "User Id")]
            public string userId { get; set; }

            [Display(Name = "Password")]
            public string Password { get; set; }

            [Display(Name = "User Type")]
            public string UserType { get; set; }

            [Display(Name = "Email Id*")]
            [Required]
            [RegularExpression(@"\A(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)\Z",
            ErrorMessage = "Please enter correct email address")]
            public string Email { get; set; }

            [Display(Name = "Contact No*")]
            [RegularExpression(@"^\d+(\.\d+)?$", ErrorMessage = "Please use only number")]
            [Required]
            public string Contact { get; set; }

            [Display(Name = "Photo")]
            public string Photo { get; set; }

            [Display(Name = "Name*")]
            [Required]
            public string Name { get; set; }


            [Display(Name = "Addresss")]
            public string Address { get; set; }

            [Display(Name = "City")]
            public string City { get; set; }
        }

        public class ChangePasswordModel
        {
            [Display(Name = "UserId")]
            public string UserId { get; set; }

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

        public class PageModel
        {
            public string id { get; set; }

            public string Page_Name { get; set; }

            public string Page_Title { get; set; }

            public string Meta_Name { get; set; }

            public string Meta_Description { get; set; }

            public string Page_Heading { get; set; }

            public string Page_Section { get; set; }

            public string Page_Content { get; set; }
        }

        public class SliderModel
        {
            [Display(Name = "SliderId")]
            public string Slider_Id { get; set; }

            [Display(Name = "SliderImage")]
            public string SliderImage { get; set; }

            //[Required]
            //[Display(Name = "Title")]
            //public string Title { get; set; }

            //[Required]
            //[Display(Name = "SubTitle")]
            //public string SubTitle { get; set; }

            //[Required]
            //[Display(Name = "Short description")]
            //public string Shortdesc { get; set; }
        }

        public class YoutubeListModel
        {
            [Display(Name = "Youtube Id")]
            public string YTubeId { get; set; }

            [Required]
            [RegularExpression(@"^(http|ftp|https|www)://([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?$",
            ErrorMessage = "Please enter valid Link")]
            [Display(Name = "YouTube Banner")]
            public string YoutubeBanner { get; set; }

            [Required]
            [RegularExpression(@"^(http|ftp|https|www)://([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?$",
            ErrorMessage = "Please enter valid Link")]
            [Display(Name = "Drone Video 1")]
            public string DroneVideo1 { get; set; }

            [Required]
            [RegularExpression(@"^(http|ftp|https|www)://([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?$",
            ErrorMessage = "Please enter valid Link")]
            [Display(Name = "Drone Video 2")]
            public string DroneVideo2 { get; set; }

        }

        public class GalleryModel
        {
            [Display(Name = "Gallery Id")]
            public string GalleryId { get; set; }

            //[Required]
            [Display(Name = "Title")]
            public string Title { get; set; }

            //[Required]
            [Display(Name = "Images")]
            public string Images { get; set; }
        }

        public class PageBannerModel
        {
            [Display(Name = "Banner Id")]
            public string BannerId { get; set; }

            [Required]
            [Display(Name = "Page Name")]
            public string PageName { get; set; }

            [Display(Name = "Banner")]
            public string BannerImage { get; set; }
        }

        public class TestimonialModel
        {

            //[Required]
            [Display(Name = "Testimonial Id")]
            public string Testimonial_Id { get; set; }

            [Required(ErrorMessage = "Name is required")]
            [Display(Name = "Name*")]
            public string Name { get; set; }

            [Required(ErrorMessage = "Description is required")]
            [Display(Name = "Description*")]
            public string Testimonial_desc { get; set; }

            [Required(ErrorMessage = "Designation is required")]
            [Display(Name = "Designation*")]
            public string Designation { get; set; }

            public string Image { get; set; }

            [Display(Name = "Status")]
            public string Status { get; set; }

            [Display(Name = "Entry date")]
            public string Entry_date { get; set; }

        }

        public class ServicesModel
        {
            //[Required]
            [Display(Name = "ServiceId")]
            public string ServiceId { get; set; }

            [Required]
            [Display(Name = "Name *")]
            public string Name { get; set; }

            [Required]
            [Display(Name = "Description *")]
            public string Description { get; set; }

            [Display(Name = "Image *")]
            public string Image { get; set; }


            [Display(Name = "Entry date")]
            public string Entry_date { get; set; }

            [Display(Name = "Service status")]
            public string Service_status { get; set; }

        }

        public class SocialModel
        {
            public string Id { get; set; }

            [Required]
            [Display(Name = "Facebook")]
            [RegularExpression(@"^(http|ftp|https|www)://([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?$",
            ErrorMessage = "Please enter valid Link")]
            public string Facebook { get; set; }

            [Required]
            [Display(Name = "Twitter")]
            [RegularExpression(@"^(http|ftp|https|www)://([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?$",
            ErrorMessage = "Please enter valid Link")]
            public string Twitter { get; set; }

            //[Required]
            //[Display(Name = "Google Plus")]
            //[RegularExpression(@"^(http|ftp|https|www)://([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?$",
            //ErrorMessage = "Please enter valid Link")]
            //public string Googleplus { get; set; }

            [Required]
            [Display(Name = "Instagram")]
            [RegularExpression(@"^(http|ftp|https|www)://([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?$",
            ErrorMessage = "Please enter valid Link")]
            public string Instagram { get; set; }

            //[Required]
            //[Display(Name = "Linkedin")]
            //[RegularExpression(@"^(http|ftp|https|www)://([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?$",
            //ErrorMessage = "Please enter valid Link")]
            //public string Linkedin { get; set; }

            [Required]
            [Display(Name = "Youtube")]
            [RegularExpression(@"^(http|ftp|https|www)://([\w+?\.\w+])+([a-zA-Z0-9\~\!\@\#\$\%\^\&\*\(\)_\-\=\+\\\/\?\.\:\;\'\,]*)?$",
            ErrorMessage = "Please enter valid Link")]
            public string Youtube { get; set; }


            [Required(ErrorMessage = "Map is required")]
            [Display(Name = "Map")]
            public string Map { get; set; }

            [Required(ErrorMessage = "Contact address is required")]
            [Display(Name = "Address")]
            public string Address { get; set; }

            [Required(ErrorMessage = "Contact is required")]
            [Display(Name = "Contact")]
            public string Contact { get; set; }

            [Required(ErrorMessage = "Email is required")]
            [Display(Name = "Email")]
            public string Email { get; set; }
        }
        
        public class OurSolutionModel
        {
            //[Required]
            [Display(Name = "SolutionId")]
            public string SolutionId { get; set; }

            [Required]
            [Display(Name = "Title")]
            public string Title { get; set; }

            [Required]
            [Display(Name = "Description")]
            public string Description { get; set; }

        }


        public class SEOModel
        {
            [Display(Name = "SEO Id")]
            public string SEOId { get; set; }

            [Display(Name = "Page Name")]
            public string PageName { get; set; }

            [Display(Name = "View Name")]
            public string ViewName { get; set; }

            [Display(Name = "Page Title")]
            public string PageTitle { get; set; }

            [Display(Name = "Meta Canonical")]
            public string MetaCanonical { get; set; }

            [Display(Name = "Meta Robots")]
            public string MetaRobots { get; set; }

            [Display(Name = "Meta Description")]
            public string Description { get; set; }

            [Display(Name = "Google Site Verification")]
            public string google_site_verification { get; set; }

        }
    }
}