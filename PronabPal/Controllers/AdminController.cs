using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using System.IO;
using Models;
using Classes;
using Class;

namespace PronabPal.Controllers
{
    public class AdminController : Controller
    {
        //
        // GET: /Admin/
        adminDataLayer dl = new adminDataLayer();

        private string changeImage(string id, HttpPostedFileBase file)
        {

            DataSet ds = dl.Inline_Process("select Photo from dbo.AdminLogin_tbl where UserId='" + id + "'");
            if (ds.Tables[0].Rows.Count > 0)
            {
                string fname = ds.Tables[0].Rows[0]["Photo"].ToString();
                if (file != null)
                {
                    if (System.IO.File.Exists(Server.MapPath("~/Images/Admin/" + fname)))
                    {
                        System.IO.File.Delete(Server.MapPath("~/Images/Admin/" + fname));
                    }
                    string newfname = "A" + System.DateTime.Now.GetHashCode() + Path.GetExtension(file.FileName);
                    file.SaveAs(Server.MapPath("~/Images/Admin/" + newfname));

                    return newfname;
                }
                else
                {
                    return fname;
                }
            }
            else
            {
                return "";
            }


        }

        public ActionResult EditProfile(string id)
        {
            AdminModels.AdminProfile model = new AdminModels.AdminProfile();
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            if (PronabPal_login_Cookies_Admin == null)
            {
                return RedirectToAction("Index", "Portal");
            }
            else
            {
                if (PronabPal_login_Cookies_Admin != null)
                {
                    model.userId = PronabPal_login_Cookies_Admin["UserId"].ToString();
                    model.UserType = PronabPal_login_Cookies_Admin["UserType"].ToString();
                }
                DataSet ds = dl.Inline_Process("select * from dbo.AdminLogin_tbl where UserId='" + id + "'");
                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    model.userId = ds.Tables[0].Rows[0]["UserId"].ToString();
                    model.Password = ds.Tables[0].Rows[0]["Password"].ToString();
                    model.UserType = ds.Tables[0].Rows[0]["UserType"].ToString();
                    model.Email = ds.Tables[0].Rows[0]["EmailId"].ToString();
                    model.Contact = ds.Tables[0].Rows[0]["ContactNo"].ToString();
                    model.Photo = ds.Tables[0].Rows[0]["Photo"].ToString();
                    model.Name = ds.Tables[0].Rows[0]["Name"].ToString();
                    model.Address = ds.Tables[0].Rows[0]["Address"].ToString();
                    model.City = ds.Tables[0].Rows[0]["City"].ToString();
                }
                if (model.Photo != "")
                {
                    ViewBag.photo = "~/Images/Admin/" + model.Photo;
                }
                else
                {
                    ViewBag.photo = "~/Content/AdminTheme/themes/supr/img/-text.png";
                }
            }
            return View(model);
        }
        [HttpPost]
        public ActionResult EditProfile(string id, AdminModels.AdminProfile model, HttpPostedFileBase ImageData)
        {
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            if (PronabPal_login_Cookies_Admin != null)
            {
                model.userId = PronabPal_login_Cookies_Admin["UserId"].ToString();
                model.UserType = PronabPal_login_Cookies_Admin["UserType"].ToString();

                if (ModelState.IsValid)
                {
                    model.Photo = dl.NewSaveSingleImages("~/Images/Admin/", ImageData, model.Photo);
                    int i = dl.AdminEditProfile(model);
                    if (i > 0)
                    {
                        TempData["success"] = "Profile successfully updated!";
                        return RedirectToAction("Dashboard", "Portal");
                    }
                    else
                    {
                        ViewBag.error = "Something is going wrong.";
                    }
                }
                else
                {
                    ViewBag.error = "Something is going wrong.";
                }
            }
            else
            {
                return RedirectToAction("Index", "Portal");
            }
            return EditProfile(id);
        }


        public ActionResult ChangePassword()
        {
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];

            if (PronabPal_login_Cookies_Admin == null)
            {

                return RedirectToAction("Index", "Portal");
            }
            return View();
        }
        [HttpPost]
        public ActionResult ChangePassword(AdminModels.ChangePasswordModel model)
        {
            string status = "";
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            if (PronabPal_login_Cookies_Admin != null)
            {
                model.UserId = PronabPal_login_Cookies_Admin["UserId"].ToString();
            }
            try
            {
                if (ModelState.IsValid)
                {
                    if (model.newPass.Length >= 6)
                    {
                        DataSet ds = dl.AdminChangePassword(model);
                        if (ds.Tables[0].Rows.Count > 0)
                        {
                            status = ds.Tables[0].Rows[0][1].ToString();
                            if (status == "FAILED")
                            {
                                ViewBag.error = "Incorrect Old Password";
                            }
                            else
                            {
                                TempData["pwdsuccess"] = "Password Changed successfully ";
                            }
                        }
                    }
                    else
                    {
                        ViewBag.message = "Password length must be greater than 6 digits";
                    }
                }

                return RedirectToAction("Dashboard", "Portal");
                
            }
            catch
            {
               
            }
            return View();
        }

        #region USER
        //public ActionResult RegisterList(string Search = "", long Page = 1)
        //{
        //    HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
        //    if (PronabPal_login_Cookies_Admin == null)
        //    {
        //        return RedirectToAction("Index", "Portal");
        //    }
        //    else
        //    {
        //        dbRegisterList(Search, Page);
        //    }
        //    return View();
        //}

        //public ActionResult UserView(string id)
        //{
        //    HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
        //    if (PronabPal_login_Cookies_Admin == null)
        //    {
        //        return RedirectToAction("Index", "Portal");
        //    }
        //    else
        //    {
        //        DataSet ds = dl.Inline_Process("select * from dbo.Login_Table where Register_Id='" + id + "'");
        //        if (ds != null && ds.Tables[0].Rows.Count > 0)
        //        {
        //            ViewBag.Register_Id = ds.Tables[0].Rows[0]["Register_Id"].ToString();
        //            ViewBag.User_Name = ds.Tables[0].Rows[0]["User_Name"].ToString();
        //            ViewBag.First_Name = ds.Tables[0].Rows[0]["First_Name"].ToString();
        //            ViewBag.Last_Name = ds.Tables[0].Rows[0]["Last_Name"].ToString();
        //            ViewBag.SubscriptionYear = ds.Tables[0].Rows[0]["SubscriptionYear"].ToString();
        //            ViewBag.SubscriptionMonth = ds.Tables[0].Rows[0]["SubscriptionMonth"].ToString();
        //            ViewBag.CreditCardNo = ds.Tables[0].Rows[0]["CreditCardNo"].ToString();
        //            ViewBag.Ethnicity = ds.Tables[0].Rows[0]["Ethnicity"].ToString();
        //            ViewBag.Age = ds.Tables[0].Rows[0]["Age"].ToString();
        //            ViewBag.Billing_Address = ds.Tables[0].Rows[0]["Billing_Address"].ToString();
        //            ViewBag.Address = ds.Tables[0].Rows[0]["Address"].ToString();
        //            ViewBag.City = ds.Tables[0].Rows[0]["City"].ToString();
        //            ViewBag.State = ds.Tables[0].Rows[0]["State"].ToString();
        //            ViewBag.Country = ds.Tables[0].Rows[0]["Country"].ToString();
        //            ViewBag.Zip = ds.Tables[0].Rows[0]["Zip"].ToString();
        //            ViewBag.Gender = ds.Tables[0].Rows[0]["Gender"].ToString();
        //            ViewBag.DOB = ds.Tables[0].Rows[0]["DOB"].ToString();
        //            ViewBag.Entry_Date = ds.Tables[0].Rows[0]["Entry_Date"].ToString();
        //            ViewBag.Login_Status = ds.Tables[0].Rows[0]["Login_Status"].ToString();                    
        //        }
        //    }
        //    return View();
        //}

        //public ActionResult UserDeactivate(string id)
        //{
        //    try
        //    {
        //        int i = dl.Inline_ExecuteNonQry("Update dbo.Login_Table Set Login_Status=0 where Register_Id='" + id + "'");
        //        if (i > 0)
        //        {
        //            TempData["UserDeactivate"] = "User deactivate successfully";
        //        }
        //        else
        //        {
        //            TempData["ErrorMSG"] = "Oops! Something is going wrong.";
        //        }

        //        return RedirectToAction("RegisterList", "admin");
        //    }
        //    catch
        //    {
        //        return RedirectToAction("RegisterList", "admin");
        //    }
        //}

        //public ActionResult UserActivate(string id)
        //{
        //    try
        //    {
        //        int i = dl.Inline_ExecuteNonQry("Update dbo.Login_Table Set Login_Status=1 where Register_Id='" + id + "'");
        //        if (i > 0)
        //        {
        //            TempData["UserDeactivate"] = "User Activate successfully";
        //        }
        //        else
        //        {
        //            TempData["ErrorMSG"] = "Oops! Something is going wrong.";
        //        }

        //        return RedirectToAction("RegisterList", "admin");
        //    }
        //    catch
        //    {
        //        return RedirectToAction("RegisterList", "admin");
        //    }
        //}
        #endregion

        public ActionResult AddSlider()
        {
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            if (PronabPal_login_Cookies_Admin == null)
            {
                return RedirectToAction("Index", "Portal");
            }
            return View();
        }
        [HttpPost]
        public ActionResult AddSlider(AdminModels.SliderModel model, HttpPostedFileBase ImageData)
        {
            try
            {
                HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
                if (PronabPal_login_Cookies_Admin == null)
                {
                    return RedirectToAction("Index", "Portal");
                }
                else
                {
                    model.Slider_Id = dl.GeenrateRandomnumber("S");
                    model.SliderImage = dl.NewSaveSingleImages("~/Images/Slider/", ImageData, "");
                    if (ModelState.IsValid)
                    {
                        int i = dl.saveSlider(model);
                        if (i > 0)
                        {
                            TempData["SliderMSG"] = "Slider added successfully!";
                            return RedirectToAction("SliderList", "admin");
                        }
                        else
                        {
                            TempData["ErrorMSG"] = "Oops! Something is going wrong.";
                        }
                    }
                }
            }
            catch (Exception e)
            {
                TempData["ErrorMSG"] = "Oops! Something is going wrong.";
            }
            return View();
        }

        public ActionResult SliderList()
        {
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            if (PronabPal_login_Cookies_Admin == null)
            {
                return RedirectToAction("Index", "Portal");
            }
            else
            {
                string qry = "select * from dbo.Slider_tbl where 1=1 order by Entry_date DESC";
                DataSet ds = dl.Inline_Process(qry);
                DataTable dt = new DataTable();
                if (ds != null && ds.Tables.Count > 0)
                {
                    dt = ds.Tables[0];
                }
                ViewBag.Sliderlist = ds;
            }
            return View();
        }

        public ActionResult EditSlider(string id)
        {
            AdminModels.SliderModel model = new AdminModels.SliderModel();
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            if (PronabPal_login_Cookies_Admin == null)
            {
                return RedirectToAction("Index", "Portal");
            }
            else
            {
                model.Slider_Id = id;
                DataSet ds = dl.Inline_Process("select * from dbo.Slider_tbl where Slider_Id='" + model.Slider_Id + "'");
                if (ds.Tables[0].Rows.Count > 0)
                {
                    model.Slider_Id = ds.Tables[0].Rows[0]["Slider_Id"].ToString();
                    model.SliderImage = ds.Tables[0].Rows[0]["Slider_Image"].ToString();
                    //model.Title = ds.Tables[0].Rows[0]["Title"].ToString();
                    //model.SubTitle = ds.Tables[0].Rows[0]["Sub_Title"].ToString();
                    //model.Shortdesc = ds.Tables[0].Rows[0]["Short_desc"].ToString();
                }
                if (model.SliderImage != null && model.SliderImage != "")
                {
                    ViewBag.Image = "~/Images/Slider/" + model.SliderImage;
                }
                else
                {
                    ViewBag.Image = "~/Content/AdminTheme/themes/supr/img/-text.png";
                }
            }
            return View(model);
        }
        [HttpPost]
        public ActionResult EditSlider(string id, AdminModels.SliderModel model, HttpPostedFileBase ImageData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    model.Slider_Id = id;

                    model.SliderImage = dl.NewSaveSingleImages("~/Images/Slider/", ImageData, model.SliderImage);

                    int i = dl.saveSlider(model);
                    if (i > 0)
                    {
                        TempData["SliderupdateMSG"] = "Slider update successfully!";
                    }

                    else
                    {
                        TempData["ErrorMSG"] = "Oops! Something is going wrong.";
                    }
                    return RedirectToAction("SliderList", "Admin");
                }
                else
                {
                    TempData["ErrorMSG"] = "Oops! Something is going wrong.";
                }
            }
            catch
            {
                TempData["ErrorMSG"] = "Oops! Something is going wrong.";
            }
            return EditSlider(model.Slider_Id);
        }

        public ActionResult DeleteSlider(string id)
        {
            try
            {
                DataSet ds = dl.Inline_Process("select * from dbo.Slider_tbl where Slider_Id='" + id + "'");
                string fn = ds.Tables[0].Rows[0]["Slider_Image"].ToString();
                int i = dl.DeleteRow("dbo.Slider_tbl", "Slider_Id", id);
                if (i > 0)
                {
                    if (System.IO.File.Exists(Server.MapPath("~/Images/Slider/" + fn)))
                    {
                        System.IO.File.Delete(Server.MapPath("~/Images/Slider/" + fn));
                    }
                    TempData["SliderDeleteMSG"] = "Slider Image deleted successfully";
                }
                else
                {
                    TempData["ErrorMSG"] = "Oops! Something is going wrong.";
                }

           }
            catch
            {
                TempData["ErrorMSG"] = "Oops! Something is going wrong.";

            }
            return RedirectToAction("SliderList", "admin");

        }

        //==========================Youtube List=============================

        //public ActionResult youtube_list()
        //{
        //    AdminModels.YoutubeListModel model = new AdminModels.YoutubeListModel();

        //    HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
        //    if (PronabPal_login_Cookies_Admin == null)
        //    {
        //        return RedirectToAction("Index", "Portal");
        //    }

        //    else
        //    {
        //        DataSet ds = dl.Inline_Process("select * from dbo.YouTubeLinks_tbl where YTubeId='1'");
        //        if (ds.Tables[0].Rows.Count > 0)
        //        {
        //            model.YTubeId = ds.Tables[0].Rows[0]["YTubeId"].ToString() != "" ? ds.Tables[0].Rows[0]["YTubeId"].ToString() : "1";
        //            model.YoutubeBanner = "https://www.youtube.com/watch?v=" + (ds.Tables[0].Rows[0]["YoutubeBanner"].ToString() != "" ? ds.Tables[0].Rows[0]["YoutubeBanner"].ToString() : "");
        //            model.DroneVideo1 = "https://www.youtube.com/watch?v=" + (ds.Tables[0].Rows[0]["DroneVideo1"].ToString() != "" ? ds.Tables[0].Rows[0]["DroneVideo1"].ToString() : "");
        //            model.DroneVideo2 = "https://www.youtube.com/watch?v=" + (ds.Tables[0].Rows[0]["DroneVideo2"].ToString() != "" ? ds.Tables[0].Rows[0]["DroneVideo2"].ToString() : "");

        //        }
        //    }
        //    return View(model);
        //}

        //[HttpPost]
        //public ActionResult youtube_list(AdminModels.YoutubeListModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        model.YTubeId = "1";
        //        model.YoutubeBanner = dl.CheckYoutubeURL(model.YoutubeBanner);
        //        model.DroneVideo1 = dl.CheckYoutubeURL(model.DroneVideo1);
        //        model.DroneVideo2 = dl.CheckYoutubeURL(model.DroneVideo2);

        //        int i = dl.saveYoutubeLinks(model);
        //        if (i > 0)
        //        {
        //            TempData["SliderMSG"] = "Youtube added successfully!";
        //            return RedirectToAction("youtube_list", "admin");
        //        }
        //        else
        //        {
        //            TempData["ErrorMSG"] = "Oops! Something is going wrong.";
        //        }
        //    }
        //    return View();
        //}
    }
}
