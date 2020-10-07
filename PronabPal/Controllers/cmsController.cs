using Class;
using Classes;
using Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PronabPal.Controllers
{
    public class cmsController : Controller
    {

        adminDataLayer dl = new adminDataLayer();

        private void dbPagesList(string Search = "", long Page = 1)
        {
            Search = Search.Trim();
            string qry = "select * from dbo.CMS_tbl where 1=1 ";
            string filter = "";
            if (Search != "")
            {
                filter = "and (Page_Name like '%" + Search + "%' or Page_Heading like '%" + Search + "%' )";
            }

            qry = qry + filter;
            DataSet ds = dl.Inline_Process(qry, "id", "ASC", Page, 20);
            DataTable dt = new DataTable();
            if (ds != null && ds.Tables.Count > 0)
            {
                dt = ds.Tables[1];
            }

            long Tot = 0;
            if (dt.Rows.Count > 0)
            {
                long.TryParse(dt.Rows[0]["TotalPage"].ToString(), out Tot);
            }

            ViewBag.TotalPage = Tot;
            ViewBag.CurrentPage = Page;
            ViewBag.PageList = ds;
            ViewBag.Search = Search;
        }

        public ActionResult pages(string Search = "", long Page = 1)
        {
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            if (PronabPal_login_Cookies_Admin == null)
            {
                return RedirectToAction("Index", "Portal");
            }
            else
            {
                dbPagesList(Search, Page);
            }
            return View();
        }


        public ActionResult page_edit(string id)
        {
            ViewBag.Pageid = id;
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            if (PronabPal_login_Cookies_Admin == null)
            {
                return RedirectToAction("Index", "Portal");
            }
            else
            {
                DataSet ds = dl.Inline_Process("select * from dbo.CMS_tbl where id=" + id);
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ViewBag.Id = ds.Tables[0].Rows[0]["id"].ToString();
                    ViewBag.PageName = ds.Tables[0].Rows[0]["Page_Name"].ToString();
                    //ViewBag.MetaName = ds.Tables[0].Rows[0]["Meta_Name"].ToString();
                    //ViewBag.MetaDescription = ds.Tables[0].Rows[0]["Meta_Description"].ToString();
                    ViewBag.PageTitle = ds.Tables[0].Rows[0]["Page_Title"].ToString();
                    ViewBag.PageHeading = ds.Tables[0].Rows[0]["Page_Heading"].ToString();
                    //ViewBag.Section = ds.Tables[0].Rows[0]["Section"].ToString();
                    ViewBag.Desc = ds.Tables[0].Rows[0]["Page_Content"].ToString();
                }
            }
            return View();
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult page_edit(string id, FormCollection collection)
        {
            try
            {
                AdminModels.PageModel model = new AdminModels.PageModel();
                model.id = id.ToString();
                model.Page_Name = collection.Get("page_name");
                //model.Meta_Name = collection.Get("Meta_Name");
                //model.Meta_Description = collection.Get("Meta_Description");
                model.Page_Title = collection.Get("page_title");
                model.Page_Heading = collection.Get("page_heading");
               // model.Page_Section = collection.Get("page_Section");
                model.Page_Content = collection.Get("page_desc");

                int i = dl.insertPage(model);
                if (i > 0)
                {
                    TempData["CMSSuccessMSG"] = " Content saved successfully!";
                    return RedirectToAction("pages", "cms");
                }
                else
                {
                    ViewBag.CMSErrorMSG = "Oops! Something is going wrong.";
                }
            }
            catch (Exception ex)
            {
                ViewBag.CMSErrorMSG = "Oops! Something is going wrong.";
            }
            return page_edit(id);
        }



        #region GALLERY
        private void DBGalleryList(string Search = "", long Page = 1)
        {
            Search = Search.Trim();
            string qry = "select * from dbo.Gallery_tbl where 1=1 ";
            string filter = "";
            if (Search != "")
            {
                filter = "and (Title like '%" + Search + "%')";
            }

            qry = qry + filter;
            DataSet ds = dl.Inline_Process(qry, "Entrydate", "DESC", Page, 20);
            DataTable dt = new DataTable();
            if (ds != null && ds.Tables.Count > 0)
            {
                dt = ds.Tables[1];
            }

            long Tot = 0;
            if (dt.Rows.Count > 0)
            {
                long.TryParse(dt.Rows[0]["TotalPage"].ToString(), out Tot);
            }

            ViewBag.TotalPage = Tot;
            ViewBag.CurrentPage = Page;
            ViewBag.GalleryList = ds;
            ViewBag.Search = Search;
        }


        public ActionResult GalleryList(string Search = "", long Page = 1)
        {
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            if (PronabPal_login_Cookies_Admin == null)
            {
                return RedirectToAction("Index", "Portal");
            }
            else
            {
                DBGalleryList(Search, Page);
            }
            return View();
        }

        public ActionResult Gallery()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Gallery(AdminModels.GalleryModel model, HttpPostedFileBase ImageData)
        {

            try
            {
                model.GalleryId = dl.GeenrateRandomnumber("I");
                model.Images = dl.NewSaveSingleImages("~/Images/gallery/", ImageData, "");
                int i = dl.insertGallery(model);
                if (i > 0)
                {
                    TempData["MSG"] = "Image added successfully!";
                    return RedirectToAction("GalleryList");
                }
                else
                {
                    TempData["Error"] = "Oops!Something is going wrong.";
                }

            }
            catch
            {

            }
            return Gallery();
        }

        public ActionResult deleteImage(string id)
        {
            try
            {
                DataSet ds = dl.Inline_Process("select Image from Gallery_tbl where GalleryId='" + id + "'");
                string fn = ds.Tables[0].Rows[0]["Image"].ToString();
                int i = dl.DeleteRow("Gallery_tbl", "GalleryId", id);
                if (i > 0)
                {
                    if (System.IO.File.Exists(Server.MapPath("~/Images/gallery/" + fn)))
                    {
                        System.IO.File.Delete(Server.MapPath("~/Images/gallery/" + fn));
                    }
                    TempData["MSG"] = "Image deleted successfully";
                }

                return RedirectToAction("GalleryList");
            }
            catch
            {
                return RedirectToAction("GalleryList");
            }
        }
        #endregion
    }
}
