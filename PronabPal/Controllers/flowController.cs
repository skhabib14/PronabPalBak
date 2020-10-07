using Classes;
using PronabPal.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PronabPal.Controllers
{
    public class flowController : Controller
    {
        //
        // GET: /flow/

        AccountDataLayer dl = new AccountDataLayer();
        long PageSize = 10;

        public ActionResult Index(string id, string spotid = "")
        {
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }
            else
            {
                ViewBag.SpotId = spotid;
                DataSet ds = dl.Inline_Process("select * from dbo.Dictum where Dictum_ID='" + id + "'");
                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    ViewBag.FlowId = ds.Tables[0].Rows[0]["Dictum_ID"].ToString();
                    ViewBag.FlowTitle = ds.Tables[0].Rows[0]["Phrase"].ToString() != "" ? ds.Tables[0].Rows[0]["Phrase"].ToString() : "";
                    ViewBag.FlowDescription = ds.Tables[0].Rows[0]["Description"].ToString() != "" ? ds.Tables[0].Rows[0]["Description"].ToString() : "";

                }

                //Spot

                DataSet sds = dl.Inline_Process("select * from dbo.View_SpotList where Dictum_ID='" + id + "' order by Element_ID asc");
                if (sds != null && sds.Tables[0].Rows.Count > 0)
                {
                    ViewBag.SpotListDb = sds;

                    if (string.IsNullOrEmpty(spotid) && spotid == "")
                    {
                        ViewBag.SpotId = sds.Tables[0].Rows[0]["Spot_Id"].ToString();
                    }
                }
            }

            return View();
        }

        public ActionResult details(string id)
        {
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }
            else
            {
                DataSet ds = dl.Inline_Process("select * from dbo.flow_tbl where Flow_Id='" + id + "'");
                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    ViewBag.FlowId = ds.Tables[0].Rows[0]["Flow_Id"].ToString();
                    ViewBag.FlowNo = ds.Tables[0].Rows[0]["Flow_No"].ToString() != "" ? ds.Tables[0].Rows[0]["Flow_No"].ToString() : "N/A";
                    ViewBag.FlowTitle = ds.Tables[0].Rows[0]["Flow_Title"].ToString() != "" ? ds.Tables[0].Rows[0]["Flow_Title"].ToString() : "";
                    ViewBag.ShortDescription = ds.Tables[0].Rows[0]["Short_Description"].ToString() != "" ? ds.Tables[0].Rows[0]["Short_Description"].ToString() : "";
                    ViewBag.Description = ds.Tables[0].Rows[0]["Description"].ToString() != "" ? ds.Tables[0].Rows[0]["Description"].ToString() : "";
                    ViewBag.Author = ds.Tables[0].Rows[0]["Author"].ToString() != "" ? ds.Tables[0].Rows[0]["Author"].ToString() : "";
                    ViewBag.Date = Convert.ToDateTime(ds.Tables[0].Rows[0]["Flow_Date"].ToString()).ToString("dd MMM yyyy");
                    ViewBag.Tags = ds.Tables[0].Rows[0]["Tags"].ToString() != "" ? ds.Tables[0].Rows[0]["Tags"].ToString() : "";
                    ViewBag.CanvasSketch = ds.Tables[0].Rows[0]["Canvas_Sketch"].ToString() != "" ? ds.Tables[0].Rows[0]["Canvas_Sketch"].ToString() : "";
                    ViewBag.ImageVideo = ds.Tables[0].Rows[0]["Image_Video"].ToString() != "" ? ds.Tables[0].Rows[0]["Image_Video"].ToString() : "";

                    if (ViewBag.CanvasSketch != null && ViewBag.CanvasSketch != "")
                    {
                        ViewBag.CanvasSketch = "~/Images/Flow/" + ViewBag.CanvasSketch;
                    }
                    else
                    {
                        ViewBag.CanvasSketch = "~/Content/AdminTheme/themes/supr/img/-text.png";
                    }

                    if (ViewBag.ImageVideo != null && ViewBag.ImageVideo != "")
                    {
                        ViewBag.ImageVideo = "~/Images/Flow/" + ViewBag.ImageVideo;
                    }
                    else
                    {
                        ViewBag.ImageVideo = "~/Content/AdminTheme/themes/supr/img/-text.png";
                    }
                }
            }
            return View();
        }

        public ActionResult spotdetailsbyid(string spotid, string flowid)
        {
            string qry = "";
            qry = "select * from dbo.[View_FlowspotList] where Dictum_ID='" + flowid + "' and Spot_Id='" + spotid + "'";
            DataSet ds = dl.Inline_Process(qry);
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                ViewBag.FlowId = flowid;
                ViewBag.SpotId = ds.Tables[0].Rows[0]["Spot_Id"].ToString() != "" ? ds.Tables[0].Rows[0]["Spot_Id"].ToString() : "";
                ViewBag.SpotType = ds.Tables[0].Rows[0]["Spot_Type"].ToString() != "" ? ds.Tables[0].Rows[0]["Spot_Type"].ToString() : "";
                ViewBag.SpotName = ds.Tables[0].Rows[0]["Spot_Name"].ToString() != "" ? ds.Tables[0].Rows[0]["Spot_Name"].ToString() : "";
                ViewBag.SpotDescription = ds.Tables[0].Rows[0]["SpotDesc"].ToString() != "" ? ds.Tables[0].Rows[0]["SpotDesc"].ToString() : "";

                ViewBag.FlowNo = ds.Tables[0].Rows[0]["Element_ID"].ToString() != "" ? ds.Tables[0].Rows[0]["Element_ID"].ToString() : "";
                ViewBag.FlowTitle = ds.Tables[0].Rows[0]["Phrase"].ToString() != "" ? ds.Tables[0].Rows[0]["Phrase"].ToString() : "";
                ViewBag.CanvasSketch = ds.Tables[0].Rows[0]["Canvas_Sketch"].ToString() != "" ? ds.Tables[0].Rows[0]["Canvas_Sketch"].ToString() : "";

                if (ViewBag.CanvasSketch != null && ViewBag.CanvasSketch != "")
                {
                    ViewBag.SpotCanvasSketch = "~/Images/Spot/" + ViewBag.CanvasSketch;
                }
                else
                {
                    ViewBag.SpotCanvasSketch = "~/Content/AdminTheme/themes/supr/img/-text.png";
                }

                ViewBag.SpotImg = ds.Tables[0].Rows[0]["SpotImage"].ToString() != "" ? ds.Tables[0].Rows[0]["SpotImage"].ToString() : "";

                if (ViewBag.SpotImg != null && ViewBag.SpotImg != "")
                {
                    ViewBag.SpotImage = "~/Images/Spot/" + ViewBag.SpotImg;
                }
                else
                {
                    ViewBag.SpotImage = "~/Content/AdminTheme/themes/supr/img/-text.png";
                }
            }
            return PartialView("_partialspotdetails");

        }

        private void DbFlowList(string Search = "", long Page = 1)
        {
            Search = Search.Trim().Replace("'", " ");
            string qry = "select *  from dbo.[Dictum] where 1=1";
            string filter = "";
            if (Search != "")
            {
                filter = "and (Phrase like '%" + Search + "%')";
            }

            qry = qry + filter;
            DataSet ds = dl.Inline_Process(qry, "EntryDate", "Desc", Page, 12);
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
            ViewBag.FlowListDb = ds;
            ViewBag.Search = Search;
        }

        private void fillSpotList()
        {
            List<SelectListItem> catlist = new List<SelectListItem>();
            DataSet ds = dl.Inline_Process("Select Spot_Id,Spot_Name from [dbo].[spot_tbl] order by EntryDate");
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    SelectListItem sl = new SelectListItem();
                    sl.Text = ds.Tables[0].Rows[i]["Spot_Name"].ToString();
                    sl.Value = ds.Tables[0].Rows[i]["Spot_Id"].ToString();
                    catlist.Add(sl);
                }
            }
            ViewBag.Spotlist = new SelectList(catlist, "Value", "Text");
        }

        public Dictionary<string, string> GetFlowNoList(string Author, string SpotId)
        {
            Dictionary<string, string> FlowList1 = new Dictionary<string, string>();

            DataSet ds = dl.Inline_Process("Select Count(Flow_No) as Fno from [dbo].[flow_tbl] Where Author='" + Author + "' and  Spot_Id='" + SpotId + "'");

            string flag = "ERROR";
            string FlNo = "";
            if (ds.Tables[0].Rows.Count > 0 && ds != null)
            {
                int Fno = Convert.ToInt32(ds.Tables[0].Rows[0]["Fno"]);
                if (Fno > 0)
                {
                    FlNo = (Fno + 1).ToString();
                }
                else { FlNo = "1"; }

                FlowList1.Add("Fno", FlNo);

                flag = "OK";
            }
            FlowList1.Add("Status", flag);
            return FlowList1;
        }

        public JsonResult FillWithFlowNoData(string Author, string SpotId)
        {
            Dictionary<string, string> sl = GetFlowNoList(Author, SpotId);
            return Json(sl, JsonRequestBehavior.AllowGet);
        }

        private void FillFlowNo(string Author, string Spot, string FlowNo)
        {
            DataSet ds = dl.Inline_Process("Select Count(Flow_No) as Fno from [dbo].[flow_tbl] Where Author='" + Author + "' and  Spot_Id='" + Spot + "'");
            if (ds.Tables[0].Rows.Count > 0)
            {
                int Fno = Convert.ToInt32(ds.Tables[0].Rows[0]["Fno"]);
                if (Fno > 0)
                {
                    FlowNo = (Fno + 1).ToString();
                }
                else { FlowNo = "1"; }
            }
        }

        public Image Base64ToImage(string base64String)
        {
            // Convert Base64 String to byte[]
            byte[] imageBytes = Convert.FromBase64String(base64String);
            MemoryStream ms = new MemoryStream(imageBytes, 0,
              imageBytes.Length);

            // Convert byte[] to Image
            ms.Write(imageBytes, 0, imageBytes.Length);
            Image image = Image.FromStream(ms, true);
            return image;
        }

        public ActionResult add()
        {
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }
            return View();
        }

        [HttpPost]
        public ActionResult add(FlowModel model)
        {
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }
            else
            {
                if (ModelState.IsValid)
                {
                    model.dictumID = dl.GeenrateRandomnumberInt();
                    model.Phrase = model.Phrase.Trim().Replace(" ", "_").Replace("'", "").Replace(",", "").Replace("=", "").Replace("-", "_");

                    if (dl.checkExists("Dictum", "Phrase", model.Phrase))
                    {
                        TempData["error"] = "This flow name already exists!";
                    }
                    else
                    {
                        int i = dl.SaveFlow(model);
                        if (i > 0)
                        {
                            ModelState.Clear();
                            TempData["FlowSucess"] = "Data  successfully saved!";
                            return RedirectToAction("list", "flow");
                        }
                        else
                        {
                            TempData["error"] = "Oops! Something is going wrong.";
                        }
                    }
                }
                else
                {
                    TempData["error"] = "Oops! Something is going wrong.";
                }
            }
            return View();
        }

        public ActionResult list(string Search = "", long Page = 1)
        {
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }
            else
            {
                DbFlowList(Search, Page);
            }
            return View();
        }

        public ActionResult edit(string id)
        {
            fillSpotList();
            FlowModel p = new FlowModel();
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }
            else
            {
                DataSet ds = dl.Inline_Process("select * from dbo.Dictum where Dictum_ID='" + id + "'");
                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    p.dictumID = ds.Tables[0].Rows[0]["Dictum_ID"].ToString();
                    p.Phrase = ds.Tables[0].Rows[0]["Phrase"].ToString().Replace("-", " ").Replace("_", " ");
                    p.Description = ds.Tables[0].Rows[0]["Description"].ToString();
                }
            }
            return View(p);
        }

        [HttpPost]
        public ActionResult edit(FlowModel model)
        {
            if (ModelState.IsValid)
            {
                model.Phrase = model.Phrase.Trim().Replace(" ", "_").Replace("'", "").Replace(",", "").Replace("=", "").Replace("-", "_");

                if (dl.checkExistsforEdit("Dictum", "Phrase", model.Phrase, "Dictum_ID", model.dictumID))
                {
                    TempData["error"] = "This flow name already exists!";
                }
                else
                {
                    int i = dl.SaveFlow(model);
                    if (i > 0)
                    {
                        ModelState.Clear();
                        TempData["FlowUptSucess"] = "Data  successfully updated!";
                        return RedirectToAction("list", "flow");
                    }
                    else
                    {
                        TempData["error"] = "Oops! Something is going wrong.";
                    }
                }
            }
            else
            {
                TempData["error"] = "Oops! Something is going wrong.";
            }
            return View();
        }

        public ActionResult delete(string id)
        {
            try
            {
                int i = dl.DeleteRow("Dictum", "Dictum_ID", id);
                if (i > 0)
                {
                    TempData["DeleteFlow"] = "Data  successfully deleted!";
                }
                else
                {
                    TempData["error"] = "Oops! Something is going wrong.";
                }
            }
            catch (Exception e)
            {
                TempData["error"] = e.Message;
            }
            return RedirectToAction("list");
        }

        //-----------------------------------Add spot in flow----------------------------------------


        void get_SpotListDb(int Dictum, string Search = "", long Page = 1)
        {
            Search = Search.Trim().Replace("'", "");

            string qry = @"SELECT * FROM [dbo].[spot_tbl] AS Spot1 WHERE NOT EXISTS( SELECT * FROM [dbo].[Binder] AS Spot2 WHERE Spot1.[Spot_Id] = Spot2.[Spot_Id] AND Tag_ID='" + Dictum + "')";
            string filter = "";
            if (Search != "")
            {
                filter = " and (Spot_Name like '%" + Search + "%' or Spot_Type like'%" + Search + "%')";
            }

            qry = qry + filter;
            DataSet ds = new DataSet();
            DataSet ds1 = dl.Inline_Process(qry, "EntryDate", "DESC", Page, PageSize);
            ds = ds1;
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
            ViewBag.SpotListDb = ds;
            ViewBag.Search = Search;

            var pager = new Pager(totalrows, Page, PageSize);
            ViewBag.PageNoList = pager;
        }

        [HttpPost]
        public ActionResult GetSpotList(int DictumId, string Search = "", long Page = 1)
        {
            get_SpotListDb(DictumId, Search, Page);

            ViewBag.DictumId = DictumId;

            return PartialView("_partialspotlist");
        }

        [HttpPost]
        public ActionResult addspotinflow(int DictumId, int SpotId)
        {
            ViewBag.DictumId = DictumId;

            try
            {
                int x = dl.Savespotinflow(DictumId, SpotId);
                if (x > 0)
                {
                    TempData["GetSuccess"] = "Added spot in flow successfully!";
                }
                else
                {
                    TempData["GetError"] = "Data could not be saved!";
                }
            }
            catch (Exception ex)
            { TempData["GetError"] = ex.Message; }

            get_SpotListDb(DictumId);
            return PartialView("_partialspotlist");
        }
                
    }
}
