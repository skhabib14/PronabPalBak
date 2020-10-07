using Classes;
using PronabPal.Mailers;
using PronabPal.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;


namespace PronabPal.Controllers
{
    public class AccountController : Controller
    {
        AccountDataLayer dl = new AccountDataLayer();

        UserMailer um = new UserMailer();
        EncryptDecrypt enc = new EncryptDecrypt();

        //
        // GET: /Account/Login

        public ActionResult signin()
        {
            DataSet ds = dl.Inline_Process("Select * from [dbo].[cms_tbl] where Page_Name='SignIn' and Section='signin'");
            if (ds.Tables[0].Rows.Count > 0)
            {
                ViewBag.PageHeadingSignin = ds.Tables[0].Rows[0]["Page_Heading"].ToString();
                ViewBag.PageContentSignin = ds.Tables[0].Rows[0]["Page_Content"].ToString();
            }
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult signin(FormCollection collection, User_LoginModel model)
        {
            model.EmailId = collection.Get("EmailId");
            model.Password = collection.Get("Password");
            if (ModelState.IsValid)
            {
                DataSet ds = dl.Inline_Process("select * from [dbo].[Login_tbl] where EmailId='" + model.EmailId + "' and  Password='" + model.Password + "'");
                if (ds.Tables[0].Rows.Count > 0)
                {
                    if (ds.Tables[0].Rows[0]["Email_Verfied"].ToString() == "True")
                    {
                        if (ds.Tables[0].Rows[0]["User_AStatus"].ToString() != "Inactive")
                        {
                            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
                            PronabPal_login_Cookies = new HttpCookie("PronabPal_login_Cookies");
                            PronabPal_login_Cookies["UserId"] = ds.Tables[0].Rows[0]["UserId"].ToString();
                            PronabPal_login_Cookies["UserName"] = ds.Tables[0].Rows[0]["UserName"].ToString();
                            PronabPal_login_Cookies["FirstName"] = ds.Tables[0].Rows[0]["FirstName"].ToString();
                            PronabPal_login_Cookies["LastName"] = ds.Tables[0].Rows[0]["LastName"].ToString();
                            PronabPal_login_Cookies["EmailId"] = ds.Tables[0].Rows[0]["EmailId"].ToString();
                            PronabPal_login_Cookies["UserType"] = ds.Tables[0].Rows[0]["UserType"].ToString();
                            PronabPal_login_Cookies["Registered_By"] = ds.Tables[0].Rows[0]["Registered_By"].ToString();
                            PronabPal_login_Cookies.Expires = DateTime.Now.AddHours(3);
                            Response.Cookies.Add(PronabPal_login_Cookies);

                           

                            //=============================remember me===============================\\
                            #region REMEMBER ME
                            HttpCookie PronabPal_RememberMe_Cookies = Request.Cookies["PronabPal_RememberMe_Cookies"];
                            if (model.RememberMe)
                            {
                                if (PronabPal_RememberMe_Cookies != null)
                                {
                                    PronabPal_RememberMe_Cookies.Expires = DateTime.Now.AddHours(-1);
                                    Response.Cookies.Add(PronabPal_RememberMe_Cookies);
                                }
                                PronabPal_RememberMe_Cookies = new HttpCookie("PronabPal_RememberMe_Cookies");
                                PronabPal_RememberMe_Cookies["Email"] = model.EmailId;
                                PronabPal_RememberMe_Cookies["Pwd"] = model.Password;
                                PronabPal_RememberMe_Cookies.Expires = DateTime.Now.AddDays(30);
                                Response.Cookies.Add(PronabPal_RememberMe_Cookies);
                            }
                            else
                            {
                                if (PronabPal_RememberMe_Cookies != null)
                                {
                                    PronabPal_RememberMe_Cookies.Expires = DateTime.Now.AddHours(-1);
                                    Response.Cookies.Add(PronabPal_RememberMe_Cookies);
                                }
                            }
                            #endregion
                            //================================remember me======================================\\


                            return RedirectToAction("dashboard", "Account");
                            
                        }
                        else
                        {
                            TempData["LogError"] = "Please contact admin for account approval.";
                        }
                    }
                    else
                    {
                        TempData["LogError"] = "Email not verified..Please verify email";
                    }
                }
                else
                {
                    TempData["LogError"] = "Invalid Email Id or Password...try again!";
                }
            }
            else
            {
                TempData["LogError"] = "Invalid Email Id or Password...try again!";
            }
            return signin();
        }

        public ActionResult signup()
        {
            DataSet ds = dl.Inline_Process("Select * from [dbo].[cms_tbl] where Page_Name='SignUp' and Section='signup'");
            if (ds.Tables[0].Rows.Count > 0)
            {
                ViewBag.PageHeadingSignUp = ds.Tables[0].Rows[0]["Page_Heading"].ToString();
                ViewBag.PageContentSignUp = ds.Tables[0].Rows[0]["Page_Content"].ToString();
            }
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult signup(SignUpModel model)
        {
            string table = "Login_tbl";
            string Emailid = "EmailId";
            model.Address = "";
            model.Lng = "";
            model.Lat = "";
            model.UserId = "";
            model.UserName = "";
            if (ModelState.IsValid)
            {
                if (!dl.checkExists(table, Emailid, model.EmailId.Trim()))
                {
                    model.UserId = dl.GeenrateRandomnumber("U");
                    model.UserName = model.FirstName + " " + model.LastName;
                    model.Lat = (!string.IsNullOrEmpty(model.Lat)) ? model.Lat : "0.00";
                    model.Lng = (!string.IsNullOrEmpty(model.Lng)) ? model.Lng : "0.00";
                    int i = dl.SignUp(model);
                    if (i > 0)
                    {
                        TempData["SignUpSuccess"] = "You are successfully Register!Please verify your email.";
                        um.Useractivation(enc.Encrypt(model.UserId), (model.EmailId), model.FirstName, model.LastName).Send();
                        return RedirectToAction("signin", "account");
                    }
                    else
                    {
                        TempData["SignUpERROR"] = "Failed to register in website";
                    }
                }
                else
                {
                    TempData["SignUpERROR"] = "Failed! Email Id already exists.";
                }
            }
            else
            {
                TempData["SignUpERROR"] = "Failed! Please fill all the required field.";
            }
            return signup();
        }

        //===================================Email-verification===================================

        public ActionResult verification(SignUpModel model, string uid = "")
        {
            model.UserId = enc.Decrypt(uid);
            DataSet ds = dl.Inline_Process("Select * from [dbo].[Login_tbl] where [Email_Verfied]=1 and [UserId]='" + model.UserId + "'");
            if (ds != null && ds.Tables[0].Rows.Count > 0)
            {
                TempData["Emailexists"] = "Your email is already verified!";
            }
            else
            {
                int i = dl.Inline_ExecuteNonQry("update [dbo].[Login_tbl] set [Email_Verfied]=1 where [UserId]='" + model.UserId + "'");
                if (i > 0)
                {
                    TempData["EmailVerified"] = "Email is verified successfully!.Please proceed with login.";
                }
            }
            return RedirectToAction("signin", "account");
        }


        public ActionResult logout()
        {
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies != null)
            {


                PronabPal_login_Cookies.Expires = DateTime.Now.AddHours(-1);
                Response.Cookies.Add(PronabPal_login_Cookies);
            }
            return RedirectToAction("signin", "account");
        }

        public ActionResult dashboard()
        {
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }
            else
            {
                DataSet dsfetch = dl.Inline_Process("select * from  [dbo].[Login_tbl] where [UserId]='" + PronabPal_login_Cookies["UserId"].ToString() + "'");
                ViewBag.userdtl = dsfetch;

               
            }

            return View();
        }



        public ActionResult ChangePasswordUser()
        {
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }
          
            return View();
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult ChangePasswordUser(ChangeUserPasswordModel model)
        {
            string status = "", msg = "";
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "Account");
            }
            else
            {
                model.User_Id = PronabPal_login_Cookies["UserId"].ToString();
                try
                {
                    if (ModelState.IsValid)
                    {
                        DataSet ds = dl.ChangeUserPassword(model);
                        if (ds != null && ds.Tables[0].Rows.Count > 0)
                        {
                            status = ds.Tables[0].Rows[0]["Status"].ToString();
                            msg = ds.Tables[0].Rows[0]["Msg"].ToString();
                            if (status == "FAILED")
                            {
                                TempData["changepasswordERROR"] = msg;
                            }
                            else
                            {
                                TempData["changepasswordSUCCESS"] = msg;
                                return RedirectToAction("ChangePasswordUser", "Account");
                            }
                        }
                        else
                        {
                            TempData["changepasswordERROR"] = "Something is going wrong!";
                        }

                    }
                    else
                    {
                        TempData["changepasswordERROR"] = "Fill all required field.";
                    }
                }
                catch
                {
                    TempData["changepasswordERROR"] = "Something is going wrong!";
                }
            }
            return ChangePasswordUser();
        }


        public ActionResult EditProfile()
        {
            string uid = "";
            ProfileEditModel model = new ProfileEditModel();
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "account");
            }
            else
            {
                uid = PronabPal_login_Cookies["UserId"].ToString();
                DataSet ds = dl.Inline_Process("select * from [dbo].[Login_tbl] where [UserId]='" + uid + "'");
                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    DataRow dr = ds.Tables[0].Rows[0];

                    model.UserId = dr["UserId"].ToString();
                    model.UserName = dr["UserName"].ToString();
                    model.FirstName = dr["FirstName"].ToString();
                    model.LastName = dr["LastName"].ToString();
                    model.EmailId = dr["EmailId"].ToString();
                    model.Phone = dr["Phone"].ToString();
                    model.ProfileImage = dr["ProfileImage"].ToString();
                 
                }
                if (model.ProfileImage != "" && model.ProfileImage != null)
                {
                    ViewBag.imagee = "~/Images/Profile/" + model.ProfileImage;
                }
                else
                {
                    ViewBag.imagee = "~/Content/avatar.png";
                }
            }
            return View(model);
        }

        [HttpPost]
        [ValidateInput(false)]
        public ActionResult EditProfile(ProfileEditModel model, HttpPostedFileBase ImageData)
        {
            string uid = "";
            string table = "Login_tbl";
            string Emailid = "EmailId";
            HttpCookie PronabPal_login_Cookies = Request.Cookies["PronabPal_login_Cookies"];
            if (PronabPal_login_Cookies == null)
            {
                return RedirectToAction("signin", "account");
            }
            else
            {
                uid = PronabPal_login_Cookies["UserId"].ToString();
                model.UserId = uid;
                if (ModelState.IsValid)
                {
                    if (!dl.checkExistsforEdit(table, Emailid, model.EmailId.Trim(), "UserId", model.UserId))
                    {
                        model.UserName = model.FirstName + " " + model.LastName;

                        if (ImageData != null)
                        {
                            model.ProfileImage = dl.NewSaveSingleImages("~/Images/Profile/", ImageData, model.ProfileImage);
                        }
                        else
                        {

                            model.ProfileImage = "";
                        }
                        int i = dl.edituserprofile(model);
                        if (i > 0)
                        {
                            TempData["editprofileSUCCESS"] = "Profile updated successfully!";
                            return RedirectToAction("dashboard", "account");
                        }
                        else
                        {
                            TempData["editprofileerror"] = "FAILED data not saved.";
                        }
                    }
                    else
                    {
                        TempData["editprofileerror"] = "Email Id already exists";
                    }
                }
                else
                {
                    TempData["editprofileerror"] = "FAILED please fill all the reqired field.";
                }
            }
            return EditProfile();
        }


        //===============================FORGOT-PASSWORD=============================

        public ActionResult ForgotPassword()
        {
            return View();
        }
        [HttpPost]
        public ActionResult ForgotPassword(ForgetPassword p)
        {
            ModelState.Remove("Password");
            if (ModelState.IsValid)
            {
                DataSet ds = dl.Inline_Process("Select * from [dbo].[Login_tbl] where [EmailId]='" + p.Email + "'");
                if (ds != null && ds.Tables[0].Rows.Count > 0)
                {
                    p.Password = ds.Tables[0].Rows[0]["Password"].ToString();
                    p.User_Id = ds.Tables[0].Rows[0]["UserId"].ToString();
                    p.Email = ds.Tables[0].Rows[0]["EmailId"].ToString();
                    p.FirstName = ds.Tables[0].Rows[0]["FirstName"].ToString();
                    p.LastName = ds.Tables[0].Rows[0]["LastName"].ToString();
                    try
                    {
                        UserMailer um = new UserMailer();
                        um.Userforgetpassword(p.Password, enc.Encrypt(p.User_Id), enc.Encrypt(p.Email), p.FirstName, p.LastName).Send();
                        TempData["forgotsuccess"] = "Link sent to your registered email.";
                    }
                    catch (Exception)
                    {
                        TempData["forgoterror"] = "Failed to send mail.Try Again!";
                    }

                }
                else
                {
                    TempData["forgoterror"] = "Please enter your registered email.";
                }
            }
            else
            {
                TempData["forgoterror"] = "Email address is not an valid email address.";
            }
            return View();
        }

        public ActionResult ResetPassword(string uid = "")
        {
            ResetPassword model = new ResetPassword();
            if (uid != "")
            {
                model.Email = (uid);
                model.User_Id = uid;
            }
            return View(model);
        }
        [HttpPost]
        public ActionResult ResetPassword(ResetPassword model, string uid = "")
        {

            //model.EmailId = uid;
            try
            {

                model.User_Id = enc.Decrypt(model.User_Id);
                if (ModelState.IsValid)
                {
                    int i = dl.resetpassword(model);
                    if (i > 0)
                    {
                        TempData["SignUpSuccess"] = "Password changed successfully! Login to continue.";
                        return RedirectToAction("signin", "Account");
                    }
                    else
                    {
                        TempData["reserror"] = "Oops!something went wrong.";
                    }
                }
                else
                {
                    TempData["reserror"] = "* feilds are menodatory";
                }

            }
            catch (Exception ex)
            {
                TempData["reserror"] = "Oops!something went wrong.";
            }
            return View();
        }


    }
}
