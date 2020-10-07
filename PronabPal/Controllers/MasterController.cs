using Class;
using PronabPal.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PronabPal.Controllers
{
    public class MasterController : Controller
    {
        //
        // GET: /Master/

        adminDataLayer dl = new adminDataLayer();

        private void MainCatlist(string Search = "", long Page = 1)
        {
            string qry = "select * from dbo.category_tbl where 1=1";
            string filter = "";
            if (Search != "")
            {
                filter = string.Format("and (CategoryId like '%" + Search + "%' or  CategoryName like '%" + Search + "%' )", Search);
            }

            qry = qry + filter;
            DataSet ds = dl.Inline_Process(qry, "EntryDate", "Desc", Page, 20);
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
            ViewBag.CategoryDbList = ds;
            ViewBag.Search = Search;
        }

        public ActionResult MainCategory(string Search = "", long Page = 1)
        {
            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];
            if (PronabPal_login_Cookies_Admin == null)
            {
                return RedirectToAction("Index", "Portal");
            }
            MainCatlist(Search, Page);
            return View();
        }
        [HttpPost]
        public ActionResult MainCategory(MasterModel.Maincategory model, HttpPostedFileBase ImageData)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (dl.checkExists("category_tbl", "CategoryName", model.CategoryName.Trim()))
                    {
                        TempData["error"] = "This Category already exists!";
                    }
                    else
                    {
                        model.CategoryId = dl.GeenrateRandomnumber("C");
                        string directory = "~/Images/Category/";
                        model.Image = dl.NewSaveSingleImages(directory, ImageData, "");

                        int i = dl.SaveCategory(model);
                        if (i > 0)
                        {
                            TempData["Success"] = "Data add successfully";
                            return RedirectToAction("Maincategory", "Master");
                        }
                        else
                        {
                            TempData["error"] = "Opps some thing went wrong";
                        }

                    }
                }
                else
                {
                    TempData["error"] = "Oops! Something is going wrong.";
                }
            }
            catch (Exception ex)
            {
                TempData["error"] = ex.Message;
            }

            return MainCategory();
        }

        public ActionResult DeleteMainCategory(string id)
        {
            try
            {
                int i = dl.DeleteRow("category_tbl", "CategoryId", id);
                if (i > 0)
                {
                    TempData["MainCatDelsucc"] = "Category deleted successfully";
                }
                else
                {
                    TempData["error"] = "Oops! Something is going wrong.";
                }
            }
            catch (Exception ex)
            {
               TempData["error"] = ex.Message;
            }
            return RedirectToAction("MainCategory", "Master");
        }

        public ActionResult EditMainCategory(string id, string Search = "", long Page = 1)
        {
            MasterModel.Maincategory model = new MasterModel.Maincategory();

            MainCatlist(Search, Page);

            HttpCookie PronabPal_login_Cookies_Admin = Request.Cookies["PronabPal_login_Cookies_Admin"];

            if (PronabPal_login_Cookies_Admin != null)
            {
                DataSet ds = dl.Inline_Process("select * from dbo.category_tbl where CategoryId='" + id + "'");
                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    model.CategoryId = ds.Tables[0].Rows[0]["CategoryId"].ToString();
                    model.CategoryName = ds.Tables[0].Rows[0]["CategoryName"].ToString();
                    model.Image = ds.Tables[0].Rows[0]["Image"].ToString();
                }
            }
            else
            {
                return RedirectToAction("Index", "Portal");
            }

            return View(model);
        }
        [HttpPost]
        public ActionResult EditMainCategory(string id, MasterModel.Maincategory model, HttpPostedFileBase ImageData)
        {
            try
            {
                string directory = "~/Images/Category/";
                string old = model.Image;
                if (ImageData!=null)
                {
                    model.Image = dl.NewSaveSingleImages(directory, ImageData, old);
                }
                
                model.CategoryId = id;
                DataSet ds = dl.Inline_Process("Select CategoryName from dbo.category_tbl where CategoryId='" + id + "'");
                if (ModelState.IsValid)
                {
                    int i = dl.SaveCategory(model);

                    if (i > 0)
                    {
                        TempData["EditCategorySuccess"] = "Category updated successfully!";
                        ModelState.Clear();
                        return RedirectToAction("MainCategory", "Master");
                    }
                    else
                    {
                        TempData["error"] = "Oops!! Something went wrong.";
                    }
                }
                else
                {
                    TempData["error"] = "Oops!! Something went wrong.";
                }
            }
            catch (Exception ex)
            {
                ViewBag.EditCountryMastererror = ex.Message;
            }

            return EditMainCategory(id);
        }

        ////------------------Main-Category-End------------------------------
    }
}
