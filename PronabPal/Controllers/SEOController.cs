using PronabPal.Models;
using Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Classes;
using Class;

namespace PronabPal.Controllers
{
    public class SEOController : Controller
    {
        //
        // GET: /SEO/

        long PageSize = 10;
        adminDataLayer dl = new adminDataLayer();

        public ActionResult Save()
        {
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            if (PronabPal_login_Cookies_Admin == null)
            {
                return RedirectToAction("Index", "Portal");
            }
            return View();
        }
        [HttpPost]
        public ActionResult Save(AdminModels.SEOModel model)
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
                    model.SEOId = dl.GeenrateRandomnumber("seo");

                    if (ModelState.IsValid)
                    {
                        int i = dl.SaveSEOData(model);
                        if (i > 0)
                        {
                            TempData["SEOMSG"] = "SEO data save successfully!";
                            return RedirectToAction("List");
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


        public ActionResult update(string id)
        {
            AdminModels.SEOModel model = new AdminModels.SEOModel();

            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            if (PronabPal_login_Cookies_Admin == null)
            {
                return RedirectToAction("Index", "Portal");
            }
            else
            {
                DataSet ds = dl.Inline_Process("Select * from SEO_tbl where SEOId='" + id + "'");
                if (ds != null && ds.Tables.Count > 0)
                {
                    model.SEOId = id;
                    ViewBag.PageName = ds.Tables[0].Rows[0]["PageName"].ToString();
                    ViewBag.ViewName = ds.Tables[0].Rows[0]["ViewName"].ToString();
                    model.PageName = ds.Tables[0].Rows[0]["PageName"].ToString();
                    model.ViewName = ds.Tables[0].Rows[0]["ViewName"].ToString();
                    model.PageTitle = ds.Tables[0].Rows[0]["PageTitle"].ToString();
                    model.MetaCanonical = ds.Tables[0].Rows[0]["MetaCanonical"].ToString();
                    model.MetaRobots = ds.Tables[0].Rows[0]["MetaRobots"].ToString();
                    model.Description = ds.Tables[0].Rows[0]["MetaDescription"].ToString();
                    model.google_site_verification = ds.Tables[0].Rows[0]["google_site_verification"].ToString();
                }
            }
                return View(model);
        }

        [HttpPost]
        public ActionResult update(string id, AdminModels.SEOModel model)
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
                    if (ModelState.IsValid)
                    {
                        model.SEOId = id;
                        int i = dl.SaveSEOData(model);
                        if (i > 0)
                        {
                            TempData["SEOMSG"] = "SEO data update successfully!";
                            return RedirectToAction("List");
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


        private void dbSEOList(string Search = "", long Page = 1)
        {
            Search = Search.Trim();
            string qry = "Select * from [dbo].[SEO_tbl] where 1=1";
            string filter = "";
            if (Search != "")
            {
                filter = "and (PageName like '%" + Search + "%')";
            }

            qry = qry + filter;
            DataSet ds = dl.Inline_Process(qry, "EntryDate", "ASC", Page, PageSize);
            DataTable dt = new DataTable();
            if (ds != null && ds.Tables.Count > 0)
            {
                dt = ds.Tables[1];
            }

            long Tot = 0, totalrows = 0;
            if (dt.Rows.Count > 0)
            {
                long.TryParse(dt.Rows[0]["TotalPage"].ToString(), out Tot);
                long.TryParse(dt.Rows[0]["Total"].ToString(), out totalrows);
            }

            ViewBag.TotalPage = Tot;
            ViewBag.CurrentPage = Page;
            ViewBag.SEOList = ds;
            ViewBag.Search = Search;

            var pager = new Pager(totalrows, Page, PageSize);
            ViewBag.PageNoList = pager;
        }

        public ActionResult List(string Search = "", long Page = 1)
        {
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            if (PronabPal_login_Cookies_Admin == null)
            {
                return RedirectToAction("Index", "portal");
            }
            else
            {
                dbSEOList(Search, Page);
            }
            return View();
        }

        public ActionResult Delete(string id)
        {
            try
            {
                int i = dl.DeleteRow("SEO_tbl", "SEOId", id);
                if (i > 0)
                {
                    TempData["Delsucc"] = "SEO data deleted successfully";
                }
                else
                {
                    TempData["ErrorMSG"] = "Oops! Something is going wrong.";
                }
            }
            catch (Exception ex)
            {
                TempData["ErrorMSG"] = ex.Message;
            }
            return RedirectToAction("List", "SEO");
        }
    }
}
