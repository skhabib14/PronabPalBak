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
    public class spotController : Controller
    {
        //
        // GET: /spot/

        AccountDataLayer dl = new AccountDataLayer();

        private void DbSpotListByFlow(string Search = "", string DictumId = "", long Page = 1)
        {
            Search = Search.Trim().Replace("'", " ");
            string qry = "select * from [dbo].[View_SpotList] where 1=1";
            string filter = "";
            if (Search != "")
            {
                filter = "and (Spot_Name like '%" + Search + "%' or Spot_Type like '%" + Search + "%' or Phrase like '%" + Search.Replace(" ", "_") + "%')";
            }
            if (DictumId != "")
            {
                filter = "and (Dictum_ID like '%" + DictumId + "%' or Tag_ID like '%" + DictumId + "%')";
            }

            qry = qry + filter;
            DataSet ds = dl.Inline_Process(qry, "EntryDate", "Desc", Page, 15);
            DataTable dt = new DataTable();
            if (ds != null && ds.Tables.Count > 0)
            {
                dt = ds.Tables[1];
            }

            ViewBag.SpotDetailsDb = ds;
            ViewBag.Search = Search;
        }

        public ActionResult Index()
        {
            fillDictumList();
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }
            else
            {
                // DbSpotListByFlow(Search, DictumId);string Search = "", string DictumId = ""

                DataSet ds = dl.Inline_Process("select top 1 * from dbo.[View_SpotList]");
                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    ViewBag.SpotId = ds.Tables[0].Rows[0]["Spot_Id"].ToString() != "" ? ds.Tables[0].Rows[0]["Spot_Id"].ToString() : "";
                    ViewBag.FlowNo = ds.Tables[0].Rows[0]["Element_ID"].ToString() != "" ? ds.Tables[0].Rows[0]["Element_ID"].ToString() : "";
                    ViewBag.SpotType = ds.Tables[0].Rows[0]["Spot_Type"].ToString() != "" ? ds.Tables[0].Rows[0]["Spot_Type"].ToString() : "";
                    ViewBag.SpotName = ds.Tables[0].Rows[0]["Spot_Name"].ToString() != "" ? ds.Tables[0].Rows[0]["Spot_Name"].ToString() : "";
                    ViewBag.SpotDescription = ds.Tables[0].Rows[0]["Description"].ToString() != "" ? ds.Tables[0].Rows[0]["Description"].ToString() : "";
                    ViewBag.CanvasSketch = ds.Tables[0].Rows[0]["Canvas_Sketch"].ToString() != "" ? ds.Tables[0].Rows[0]["Canvas_Sketch"].ToString() : "";
                    ViewBag.SpotImage = ds.Tables[0].Rows[0]["SpotImage"].ToString() != "" ? ds.Tables[0].Rows[0]["SpotImage"].ToString() : "";

                    ViewBag.Phrase = ds.Tables[0].Rows[0]["Phrase"].ToString().Replace("_", " ") != "" ? ds.Tables[0].Rows[0]["Phrase"].ToString().Replace("_", " ") : "";
                    ViewBag.EntryDate = Convert.ToDateTime(ds.Tables[0].Rows[0]["EntryDate"].ToString()).ToString("dd MMM yyyy") != "" ? Convert.ToDateTime(ds.Tables[0].Rows[0]["EntryDate"].ToString()).ToString("dd MMM yyyy") : "";

                    if (ViewBag.SpotImage != null && ViewBag.SpotImage != "")
                    {
                        ViewBag.SpotCanvasSketch = "~/Images/Spot/" + ViewBag.SpotImage;
                    }
                    else
                    {
                        if (ViewBag.CanvasSketch != null && ViewBag.CanvasSketch != "")
                        {
                            ViewBag.SpotCanvasSketch = "~/Images/Spot/" + ViewBag.CanvasSketch;
                        }
                        else
                        {
                            ViewBag.SpotCanvasSketch = "~/Content/AdminTheme/themes/supr/img/-text.png";
                        }
                    }
                }

                //Spot

                DataSet ds2 = dl.Inline_Process("select * from dbo.[View_SpotList] order by Element_ID asc");
                if (ds2 != null && ds2.Tables[0].Rows.Count > 0)
                {
                    ViewBag.SpotListDb = ds2;
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
                DataSet ds = dl.Inline_Process("select * from dbo.View_SpotList where Spot_Id='" + id + "'");
                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    ViewBag.SpotId = ds.Tables[0].Rows[0]["Spot_Id"].ToString() != "" ? ds.Tables[0].Rows[0]["Spot_Id"].ToString() : "";
                    ViewBag.SpotType = ds.Tables[0].Rows[0]["Spot_Type"].ToString() != "" ? ds.Tables[0].Rows[0]["Spot_Type"].ToString() : "";
                    ViewBag.SpotName = ds.Tables[0].Rows[0]["Spot_Name"].ToString() != "" ? ds.Tables[0].Rows[0]["Spot_Name"].ToString() : "";
                    ViewBag.SpotDescription = ds.Tables[0].Rows[0]["Description"].ToString() != "" ? ds.Tables[0].Rows[0]["Description"].ToString() : "";
                    ViewBag.CanvasSketch = ds.Tables[0].Rows[0]["Canvas_Sketch"].ToString() != "" ? ds.Tables[0].Rows[0]["Canvas_Sketch"].ToString() : "";

                    ViewBag.FlowNo = ds.Tables[0].Rows[0]["Element_ID"].ToString() != "" ? ds.Tables[0].Rows[0]["Element_ID"].ToString() : "";
                    ViewBag.Phrase = ds.Tables[0].Rows[0]["Phrase"].ToString() != "" ? ds.Tables[0].Rows[0]["Phrase"].ToString() : "";

                    ViewBag.EntryDate = Convert.ToDateTime(ds.Tables[0].Rows[0]["EntryDate"].ToString()).ToString("dd MMM yyyy") != "" ? Convert.ToDateTime(ds.Tables[0].Rows[0]["EntryDate"].ToString()).ToString("dd MMM yyyy") : "";

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
            }
            return View();
        }

        private void DbSpotList(string Search = "", string category = "", string DictumId = "", long Page = 1)
        {
            Search = Search.Trim().Replace("'", " ");
            string qry = "select * from [dbo].[View_SpotList] where 1=1";
            string filter = "";
            if (Search != "")
            {
                filter = "and (Spot_Name like '%" + Search + "%' or Spot_Type like '%" + Search + "%' or Phrase like '%" + Search.Replace(" ", "_") + "%')";
            }
            if (category != "")
            {
                filter = "and (CategoryId like '%" + category + "%')";
            }

            if (category != "" && Search != "")
            {
                filter = "and (Spot_Name like '%" + Search + "%' or Spot_Type like '%" + Search + "%' or Phrase like '%" + Search.Replace(" ", "_") + "%' and CategoryId like '%" + category + "%')";
            }

            if (DictumId != "")
            {
                filter = "and (Dictum_ID like '%" + DictumId + "%' or Tag_ID like '%" + DictumId + "%')";
            }

            if (DictumId != "" && Search != "")
            {
                filter = "and (Spot_Name like '%" + Search + "%' or Spot_Type like '%" + Search + "%' or Phrase like '%" + Search.Replace(" ", "_") + "%' and Dictum_ID like '%" + DictumId + "%')";
            }

            qry = qry + filter;
            DataSet ds = dl.Inline_Process(qry, "EntryDate", "Asc", Page, 15);
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
            ViewBag.SpotListDb = ds;
            ViewBag.Search = Search;
        }

        private void fillCategory()
        {
            List<SelectListItem> catlist = new List<SelectListItem>();
            DataSet ds = dl.Inline_Process("Select CategoryId,CategoryName from [dbo].[category_tbl] order by EntryDate");
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    SelectListItem sl = new SelectListItem();
                    sl.Text = ds.Tables[0].Rows[i]["CategoryName"].ToString();
                    sl.Value = ds.Tables[0].Rows[i]["CategoryId"].ToString();
                    catlist.Add(sl);
                }
            }
            ViewBag.Categorylist = new SelectList(catlist, "Value", "Text");
        }

        public Dictionary<string, string> GetFlowNoList(string FlowId)
        {
            Dictionary<string, string> FlowList1 = new Dictionary<string, string>();

            DataSet ds = dl.Inline_Process("Select Count(Flow_No) as Fno from [dbo].[spot_tbl] Where Flow_Id='" + FlowId + "'");

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

        public JsonResult FillWithFlowNoData(string FlowId)
        {
            Dictionary<string, string> sl = GetFlowNoList(FlowId);
            return Json(sl, JsonRequestBehavior.AllowGet);
        }

        private void FillFlowNo(string Flow_Id, string FlowNo)
        {
            DataSet ds = dl.Inline_Process("Select Count(Flow_No) as Fno from [dbo].[spot_tbl] Where Flow_Id='" + Flow_Id + "'");
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
        
        private void fillDictumList()
        {
            List<SelectListItem> catlist = new List<SelectListItem>();
            DataSet ds = dl.Inline_Process("Select Dictum_ID,Phrase from [dbo].[Dictum] order by EntryDate");
            if (ds.Tables[0].Rows.Count > 0)
            {
                for (int i = 0; i < ds.Tables[0].Rows.Count; i++)
                {
                    SelectListItem sl = new SelectListItem();
                    sl.Text = ds.Tables[0].Rows[i]["Phrase"].ToString().Replace("_", " ");
                    sl.Value = ds.Tables[0].Rows[i]["Dictum_ID"].ToString();
                    catlist.Add(sl);
                }
            }
            ViewBag.Dictumlist = new SelectList(catlist, "Value", "Text");
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

        public ActionResult add(string id)
        {
            fillCategory();
            fillDictumList();
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }

            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult add(SpotModel model, HttpPostedFileBase ImageData)
        {
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }
            else
            {
                model.SpotId = dl.GeenrateRandomnumberInt();

                Image img = Base64ToImage(model.CanvasSketch);
                var filePath = Server.MapPath("~/Images/Spot/" + model.SpotId + ".jpg");
                model.CanvasSketch = model.SpotId + ".jpg";
                img.Save(filePath);

                model.Image = dl.NewSaveSingleImages("~/Images/Spot/", ImageData, "");

                if (ModelState.IsValid)
                {
                    if (dl.checkExists("spot_tbl", "Spot_Name", model.SpotName.Trim()))
                    {
                        TempData["error"] = "This spot name already exists!";
                    }
                    else
                    {
                        int i = dl.SaveSpot(model);
                        if (i > 0)
                        {
                            ModelState.Clear();
                            TempData["SpotSucess"] = "Data  successfully saved!";
                            return RedirectToAction("list", "spot");
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
            fillCategory();
            fillDictumList();
            return View();
        }

        public ActionResult list(string Search = "", string category = "", string DictumId = "", long Page = 1)
        {
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }
            else
            {
                fillCategory();
                fillDictumList();
                DbSpotList(Search, category, DictumId, Page);
            }
            return View();
        }

        public ActionResult edit(string id)
        {
            fillCategory();
            fillDictumList();
            SpotModel p = new SpotModel();
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }
            else
            {
                DataSet ds = dl.Inline_Process("select * from dbo.spot_tbl where Spot_Id='" + id + "'; select Tag_ID from dbo.Binder where Spot_Id='" + id + "'");
                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    p.SpotId = ds.Tables[0].Rows[0]["Spot_Id"].ToString();
                    p.CategoryId = ds.Tables[0].Rows[0]["CategoryId"].ToString();
                    p.SpotName = ds.Tables[0].Rows[0]["Spot_Name"].ToString();
                    p.SpotType = ds.Tables[0].Rows[0]["Spot_Type"].ToString();

                    if (ds != null && ds.Tables[1].Rows.Count > 0)
                    {
                        if (!string.IsNullOrEmpty(ds.Tables[1].Rows[0]["Tag_ID"].ToString()))
                        {
                            p.DictumId = ds.Tables[1].Rows[0]["Tag_ID"].ToString();
                        }
                    }

                    if (!string.IsNullOrEmpty(ds.Tables[0].Rows[0]["Description"].ToString()))
                    {
                        p.Description = ds.Tables[0].Rows[0]["Description"].ToString();
                    }
                    p.CanvasSketch = ds.Tables[0].Rows[0]["Canvas_Sketch"].ToString();

                    if (p.CanvasSketch != null && p.CanvasSketch != "")
                    {
                        ViewBag.CanvasSketch = "~/Images/Spot/" + p.CanvasSketch;
                    }
                    else
                    {
                        ViewBag.CanvasSketch = "~/Content/AdminTheme/themes/supr/img/-text.png";
                    }

                    p.Image = ds.Tables[0].Rows[0]["SpotImage"].ToString();

                    if (p.Image != null && p.Image != "")
                    {
                        ViewBag.SpotImage = "~/Images/Spot/" + p.Image;
                    }
                    else
                    {
                        ViewBag.SpotImage = "~/Content/AdminTheme/themes/supr/img/-text.png";
                    }
                }
            }
            return View(p);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult edit(SpotModel model, HttpPostedFileBase ImageData)
        {
            if (ModelState.IsValid)
            {
                if (model.CanvasSketch != null)
                {
                    Image img = Base64ToImage(model.CanvasSketch);
                    var filePath = Server.MapPath("~/Images/Spot/" + model.SpotId + ".jpg");
                    model.CanvasSketch = model.SpotId + ".jpg";
                    img.Save(filePath);
                }

                if (ImageData != null)
                {
                    model.Image = dl.NewSaveSingleImages("~/Images/Spot/", ImageData, model.Image);
                }

                if (dl.checkExistsforEdit("spot_tbl", "Spot_Name", model.SpotName.Trim(), "Spot_Id",model.SpotId))
                {
                    TempData["error"] = "This spot name already exists!";
                    return RedirectToAction("edit", "spot", new {id=model.SpotId });
                }
                else
                {
                    int i = dl.UpdateSpot(model);
                    if (i > 0)
                    {
                        ModelState.Clear();
                        TempData["SpotSucess"] = "Data  successfully updated!";
                        return RedirectToAction("list", "spot");
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
            fillCategory();
            fillDictumList();
            return View();
        }

        public ActionResult delete(int id, int tid)
        {
            try
            {
                DataSet ds = dl.Inline_Process("select SpotImage,Canvas_Sketch from spot_tbl where Spot_Id='" + id + "'");
                string fn = ds.Tables[0].Rows[0]["SpotImage"].ToString();
                string csfn = ds.Tables[0].Rows[0]["Canvas_Sketch"].ToString();

                int i = dl.DeleteSpot(id,tid);
                if (i > 0)
                {
                    if (System.IO.File.Exists(Server.MapPath("~/Images/Spot/" + fn)))
                    {
                        System.IO.File.Delete(Server.MapPath("~/Images/Spot/" + fn));
                    }

                    if (System.IO.File.Exists(Server.MapPath("~/Images/Spot/" + csfn)))
                    {
                        System.IO.File.Delete(Server.MapPath("~/Images/Spot/" + csfn));
                    }

                    TempData["DeleteSpot"] = "Data  successfully deleted!";
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

        public ActionResult spotdetailsbyid(string spotid)
        {
            DataSet ds = dl.Inline_Process("select * from dbo.[View_SpotList] where Spot_Id='" + spotid + "'");
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                ViewBag.SpotId = ds.Tables[0].Rows[0]["Spot_Id"].ToString() != "" ? ds.Tables[0].Rows[0]["Spot_Id"].ToString() : "";
                ViewBag.FlowNo = ds.Tables[0].Rows[0]["Element_ID"].ToString() != "" ? ds.Tables[0].Rows[0]["Element_ID"].ToString() : "";
                ViewBag.SpotType = ds.Tables[0].Rows[0]["Spot_Type"].ToString() != "" ? ds.Tables[0].Rows[0]["Spot_Type"].ToString() : "";
                ViewBag.SpotName = ds.Tables[0].Rows[0]["Spot_Name"].ToString() != "" ? ds.Tables[0].Rows[0]["Spot_Name"].ToString() : "";
                ViewBag.SpotDescription = ds.Tables[0].Rows[0]["Description"].ToString() != "" ? ds.Tables[0].Rows[0]["Description"].ToString() : "";
                ViewBag.CanvasSketch = ds.Tables[0].Rows[0]["Canvas_Sketch"].ToString() != "" ? ds.Tables[0].Rows[0]["Canvas_Sketch"].ToString() : "";
                ViewBag.SpotImage = ds.Tables[0].Rows[0]["SpotImage"].ToString() != "" ? ds.Tables[0].Rows[0]["SpotImage"].ToString() : "";

                if (ViewBag.CanvasSketch != null && ViewBag.CanvasSketch != "")
                {
                    ViewBag.SpotCanvasSketch = "~/Images/Spot/" + ViewBag.CanvasSketch;
                }
                else
                {
                    if (ViewBag.SpotImage != null && ViewBag.SpotImage != "")
                    {
                        ViewBag.SpotCanvasSketch = "~/Images/Spot/" + ViewBag.SpotImage;
                    }
                    else
                    {
                        ViewBag.SpotCanvasSketch = "~/Content/AdminTheme/themes/supr/img/-text.png";
                    }
                }
            }

            return PartialView("_partialspotdetails");

        }

        //------------------------------------- Order Set ---------------------------------------------

        [HttpPost]
        public ActionResult orderset(int SpotID, int orderNo)
        {
            if (ModelState.IsValid)
            {
                int i = dl.ChangePosition(SpotID, orderNo);
                if (i > 0)
                {
                    TempData["OrdSuccess"] = "Spot order no set successfully.";
                }
                else
                {
                    TempData["error"] = "Oops!! Somehing went wrong";
                }
            }
            else
            {
                TempData["error"] = "Oops!! Somehing went wrong";
            }
            
            return RedirectToAction("list", "Spot");

            //fillDictumList();
            //DbSpotList();

            //return PartialView("_partialallspotlist");
        }
    }
}
