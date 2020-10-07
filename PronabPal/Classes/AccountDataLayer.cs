using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using PronabPal.Models;

namespace Classes
{
    public class AccountDataLayer : DataLayerFunctions
    {


        public DataSet ChangeUserPassword(ChangeUserPasswordModel model)
        {
            try
            {
                string[] paraname = { "@User_Id", "@CurrPassword", "@Password" };
                string[] paravalue = { model.User_Id, model.Password, model.newPass };
                return Executeproc("spp_ChangeUserPassword", paraname, paravalue);
            }
            catch
            {

                throw;
            }
        }


        public int edituserprofile(ProfileEditModel model)
        {
            try
            {
                string[] paraname = { "@UserId", "@UserName", "@FirstName", "@LastName", "@EmailId", "@Phone", "@ProfileImage" };
                string[] paravalue = { model.UserId, model.UserName, model.FirstName, model.LastName, model.EmailId, model.Phone, model.ProfileImage };
                return ExecuteNonproc("spp_UpdateUserProfile", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }
        public int SignUp(SignUpModel model)
        {
            try
            {
                string[] paraname = { "@UserId", "@UserName", "@FirstName", "@LastName", "@EmailId", "@Phone", "@Password", "@Lat", "@Lng", "@Address" };
                string[] paravalue = { model.UserId, model.UserName, model.FirstName, model.LastName, model.EmailId, model.Phone, model.Password, model.Lat, model.Lng, model.Address };
                return ExecuteNonproc("spp_SignUp", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        //=========================ResetPassword=====================

        public int resetpassword(ResetPassword model)
        {
            try
            {
                string[] paraname = { "@UserId", "@Password" };
                string[] paravalue = { model.User_Id, model.Password };
                return ExecuteNonproc("Reset_Password", paraname, paravalue);
            }
            catch
            {

                throw;
            }
        }

        //==============================Spot ====================================

        public int SaveSpot(SpotModel model)
        {
            try
            {
                string[] paraname = { "@Spot_Id", "@CategoryId", "@Dictum_ID", "@Spot_Name", "@Spot_Type", "@Description", "@Canvas_Sketch", "@SpotImage" };
                string[] paravalue = { model.SpotId, model.CategoryId, model.DictumId, model.SpotName, model.SpotType, model.Description, model.CanvasSketch, model.Image };
                return ExecuteNonproc("spp_Save_Spot", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        public int UpdateSpot(SpotModel model)
        {
            try
            {
                string[] paraname = { "@Spot_Id", "@CategoryId", "@Dictum_ID", "@Spot_Name", "@Spot_Type", "@Description", "@Canvas_Sketch", "@SpotImage" };
                string[] paravalue = { model.SpotId, model.CategoryId, model.DictumId, model.SpotName, model.SpotType, model.Description, model.CanvasSketch, model.Image };
                return ExecuteNonproc("spp_Update_Spot", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        public int DeleteSpot(int spotid, int tagid)
        {
            try
            {
                string[] paraname = { "@Spot_Id", "@TagId" };
                string[] paravalue = { Convert.ToInt32(spotid).ToString(), Convert.ToInt32(tagid).ToString() };
                return ExecuteNonproc("spp_DeleteSpot", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        //==============================Flow ====================================

        public int SaveFlow(FlowModel model)
        {
            try
            {
                string[] paraname = { "@Dictum_ID", "@Phrase", "@Description" };
                string[] paravalue = { model.dictumID, model.Phrase, model.Description };
                return ExecuteNonproc("spp_SaveDictum", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }


        //===================================== Sorting Order ==========================================

        public int ChangePosition(int SpotID, int ElementID)
        {
            try
            {
                string[] paraname = { "@Spot_Id","@Element_ID" };
                string[] paravalue = { Convert.ToInt32(SpotID).ToString(), Convert.ToInt32(ElementID).ToString() };
                return ExecuteNonproc("spp_Spot_SortOrder", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }

        //================================= Add spot in flow ===========================================

        public int Savespotinflow(int DictumId, int SpotId)
        {
            try
            {
                string[] paraname = { "@Dictum_ID", "Spot_Id" };
                string[] paravalue = {  Convert.ToInt32(DictumId).ToString(), Convert.ToInt32(SpotId).ToString() };
                return ExecuteNonproc("spp_Savespotinflow", paraname, paravalue);
            }
            catch
            {
                throw;
            }
        }


    }
}