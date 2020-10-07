using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.IO;
using Models;
using Classes;
using PronabPal.Models;

namespace Class
{
    public class adminDataLayer : DataLayerFunctions
    {

        public DataSet getLogin(string UserId, string Password)
        {
            try
            {
                string[] paraname = { "@UserId", "@Password" };
                string[] paravalue = { UserId, Password };
                return Executeproc("spp_admin_Login", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        public int AdminEditProfile(AdminModels.AdminProfile model)
        {
            try
            {
                string[] paraname = { "@UserId", "@Password", "@UserType", "@EmailId", "@ContactNo", "@Photo", "@Name", "@Address", "@City" };
                string[] paravalue = { model.userId, model.Password, model.UserType, model.Email, model.Contact, model.Photo, model.Name, model.Address, model.City };

                return ExecuteNonproc("spp_EditAdmin", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        public DataSet AdminChangePassword(AdminModels.ChangePasswordModel model)
        {
            try
            {
                string[] paraname = { "@UserId", "@Password", "@newPass", "@Confirm_Password" };
                string[] paravalue = { model.UserId, model.Password, model.newPass, model.Confirm_Password };
                return Executeproc("spp_admin_changePassword", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        public int insertPage(AdminModels.PageModel model)
        {
            try
            {
                //string[] paraname = { "@id", "@Page_Name", "@Meta_Name", "@Meta_Description", "@Page_Title", "@Page_Heading", "@Page_Content" };
                //string[] paravalue = { model.id, model.Page_Name, model.Meta_Name, model.Meta_Description, model.Page_Title, model.Page_Heading, model.Page_Content };
                string[] paraname = { "@id", "@Page_Name", "@Page_Title", "@Page_Heading", "@Page_Content" };
                string[] paravalue = { model.id, model.Page_Name, model.Page_Title, model.Page_Heading, model.Page_Content };
                return ExecuteNonproc("spp_insert_CMS_tbl", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        public int insertGallery(AdminModels.GalleryModel model)
        {
            try
            {
                string[] paraname = { "@GalleryId", "@Title", "@Image" };
                string[] paravalue = { model.GalleryId, model.Title, model.Images };
                return ExecuteNonproc("spp_insert_Gallery_tbl", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        public int Social(AdminModels.SocialModel model)
        {
            try
            {
                string[] paraname = { "@Id", "@Facebook", "@Twitter", "@Instagram", "@Youtube", "@Address", "@Contact", "@Email", "@Map" };
                string[] paravalue = { model.Id, model.Facebook, model.Twitter, model.Instagram, model.Youtube, model.Address, model.Contact, model.Email, model.Map };
                return ExecuteNonproc("spp_insert_Social_tbl", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        public int saveSlider(AdminModels.SliderModel model)
        {
            try
            {
            //    string[] paraname = { "@Slider_Id", "@Title", "@Sub_Title", "@Slider_Image", "@Short_desc" };
            //    string[] paravalue = { model.Slider_Id, model.Title, model.SubTitle, model.SliderImage, model.Shortdesc };

                string[] paraname = { "@Slider_Id","@Slider_Image" };
                string[] paravalue = { model.Slider_Id, model.SliderImage };
                return ExecuteNonproc("spp_insert_Slider_tbl", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }
                
        //=======================================Testimonial=============================

        public int insertTestimonial(AdminModels.TestimonialModel model)
        {
            try
            {
                string[] paraname = { "@Testimonial_Id", "@Name", "@Designation", "@Image", "@Testimonial_desc" };
                string[] paravalue = { model.Testimonial_Id, model.Name, model.Designation, model.Image, model.Testimonial_desc };
                return ExecuteNonproc("spp_insert_Testimonial_tbl", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        public int saveServices(AdminModels.ServicesModel model)
        {
            try
            {
                string[] paraname = { "@ServiceId", "@Name", "@Description", "@Image" };
                string[] paravalue = { model.ServiceId, model.Name, model.Description, model.Image };
                return ExecuteNonproc("spp_insert_Services_tbl", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        //public int insertcontact(ContactModel model)
        //{
        //    try
        //    {
        //        string[] paraname = { "@ContactId", "@Name", "@Email", "@Phone", "@Subject", "@Message" };
        //        string[] paravalue = { model.ContactId, model.Name, model.Email, model.Phone, model.Subject, model.Message };
        //        return ExecuteNonproc("spp_insert_Contact_tbl", paraname, paravalue);
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}

        
        //SEO Data========================================================

        public int SaveSEOData(AdminModels.SEOModel model)
        {
            try
            {
                string[] paraname = { "@SEOId", "@PageName", "@ViewName", "@PageTitle", "@MetaCanonical", "@MetaRobots", "@MetaDescription", "@google_site_verification" };
                string[] paravalue = { model.SEOId, model.PageName, model.ViewName, model.PageTitle, model.MetaCanonical, model.MetaRobots, model.Description, model.google_site_verification };
                return ExecuteNonproc("spp_Save_SEOData", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        //==============================Master Category====================================


        public int SaveCategory(MasterModel.Maincategory model)
        {
            try
            {
                string[] paraname = { "@CategoryId", "@CategoryName", "@Image" };
                string[] paravalue = { model.CategoryId, model.CategoryName, model.Image };
                return ExecuteNonproc("spp_Save_Category", paraname, paravalue);
            }
            catch
            {

                throw;
            }
        }
    }
}