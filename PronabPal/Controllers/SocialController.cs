using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Models;
using System.Data;
using Classes;
using Class;

namespace PronabPal.Controllers
{
    public class SocialController : Controller
    {
        //
        // GET: /Social/

        adminDataLayer dl = new adminDataLayer();

        public ActionResult Link()
        {
            AdminModels.SocialModel model = new AdminModels.SocialModel();

            DataSet ds = dl.Inline_Process("Select * from [dbo].[Social_tbl]");
            if (ds.Tables[0].Rows.Count > 0)
            {
                model.Id = ds.Tables[0].Rows[0]["Id"].ToString();
                model.Facebook = ds.Tables[0].Rows[0]["Facebook"].ToString();
                model.Twitter = ds.Tables[0].Rows[0]["Twitter"].ToString();
                model.Instagram = ds.Tables[0].Rows[0]["Instagram"].ToString();
                model.Youtube = ds.Tables[0].Rows[0]["Youtube"].ToString();
                //model.Googleplus = ds.Tables[0].Rows[0]["Googleplus"].ToString();
                //Linkedin = ds.Tables[0].Rows[0]["Linkedin"].ToString();
                model.Address = ds.Tables[0].Rows[0]["Address"].ToString();
                model.Contact = ds.Tables[0].Rows[0]["Contact"].ToString();
                model.Email = ds.Tables[0].Rows[0]["Email"].ToString();
                model.Map = ds.Tables[0].Rows[0]["Map"].ToString();
            }
            return View(model);
        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult Link(AdminModels.SocialModel model)
        {
            if (ModelState.IsValid)
            {
                int i = dl.Social(model);
                if (i > 0)
                {
                    TempData["SuccessMSG_0"] = "Social Link updated Successfully!.";
                }
                else
                {
                    TempData["ErrorMSG_0"] = "Oops!Something is going wrong";
                }
            }
            else
            {
                TempData["ErrorMSG_0"] = "Oops!Something is going wrong";
            }
            return View();
        }

    }
}
