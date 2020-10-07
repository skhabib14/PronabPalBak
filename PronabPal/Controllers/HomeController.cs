using Class;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PronabPal.Controllers
{
    public class HomeController : Controller
    {
        adminDataLayer dl = new adminDataLayer();

        public ActionResult Index()
        {
            DataSet ds = dl.Inline_Process("Select * from [dbo].[cms_tbl] where Page_Name='Home' and Section='aboutus'");
            if (ds.Tables[0].Rows.Count > 0)
            {
                ViewBag.PageHeadingAbout = ds.Tables[0].Rows[0]["Page_Heading"].ToString();
                ViewBag.PageContentAbout = ds.Tables[0].Rows[0]["Page_Content"].ToString();
            }

            DataSet ds2 = dl.Inline_Process("Select * from [dbo].[cms_tbl] where Page_Name='Home' and Section='easytolearn'");
            if (ds2.Tables[0].Rows.Count > 0)
            {
                ViewBag.PageHeadingETL = ds2.Tables[0].Rows[0]["Page_Heading"].ToString();
                ViewBag.PageContentETL = ds2.Tables[0].Rows[0]["Page_Content"].ToString();
            }

            DataSet ds3 = dl.Inline_Process("Select * from [dbo].[cms_tbl] where Page_Name='Home' and Section='researchcategory'");
            if (ds3.Tables[0].Rows.Count > 0)
            {
                ViewBag.PageHeadingResearchCat = ds3.Tables[0].Rows[0]["Page_Heading"].ToString();
                ViewBag.PageContentResearchCat = ds3.Tables[0].Rows[0]["Page_Content"].ToString();
            }

            return View();
        }

        public ActionResult HomePage()
        {
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies != null)
            {
                DataSet ds = dl.Inline_Process("Select * from [dbo].[Slider_tbl] where 1=1");
                if (ds.Tables[0].Rows.Count > 0)
                {
                    ViewBag.SliderListDb = ds;
                }
            }
            else
            {
                return RedirectToAction("signin", "account");
            }
            return View();
        }

        public ActionResult spot()
        {
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies != null)
            {

            }
            else
            {
                return RedirectToAction("signin", "account");
            }
            return View();
        }

        public ActionResult spotdetails()
        {
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies != null)
            {

            }
            else
            {
                return RedirectToAction("signin", "account");
            }
            return View();
        }
    }
}
