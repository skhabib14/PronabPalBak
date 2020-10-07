using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Data;
using Classes;
using Class;


namespace PronabPal.Controllers
{
    public class PortalController : Controller
    {
        adminDataLayer dl = new adminDataLayer();

        //
        // GET: /Portal/
        public ActionResult Index()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Index(FormCollection collection)
        {
            string UserId = collection.Get("userid");
            string Password = collection.Get("password");

            DataSet ds = dl.getLogin(UserId,Password);

            if (ds.Tables[0].Rows.Count > 0)
            {
                HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
                PronabPal_login_Cookies_Admin = new HttpCookie("PronabPal_login_Cookies_Admin");
                PronabPal_login_Cookies_Admin["UserId"] = ds.Tables[0].Rows[0]["UserId"].ToString();
                PronabPal_login_Cookies_Admin["UserType"] = ds.Tables[0].Rows[0]["UserType"].ToString();

                PronabPal_login_Cookies_Admin.Expires = System.DateTime.Now.AddHours(1); ;
                Response.Cookies.Add(PronabPal_login_Cookies_Admin);
                return RedirectToAction("Dashboard", "Portal");
            }
            else
            {
                ViewBag.Msg = "Invalid Username or Password";
            }

            return View();
        }

        public ActionResult Dashboard()
        {
            return View();
        }

        public ActionResult Logout()
        {
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            {
                PronabPal_login_Cookies_Admin.Expires = System.DateTime.Now.AddHours(-1);
                Response.Cookies.Add(PronabPal_login_Cookies_Admin);
            }
            return RedirectToAction("Index","Portal");
        }

    }
}
