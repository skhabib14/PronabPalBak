using Classes;
using Mvc.Mailer;
using System.Configuration;

namespace PronabPal.Mailers
{ 
    public class UserMailer : MailerBase, IUserMailer 	
	{
        EncryptDecrypt enc = new EncryptDecrypt();
        public string serverpath = ConfigurationManager.AppSettings["ServerPath"].ToString();

        //public string adminEmail = ConfigurationManager.AppSettings["adminemail"].ToString();

		public UserMailer()
		{
			MasterName="_Layout";
		}

        public virtual MvcMailMessage Useractivation(string UserId, string Email, string Firstname, string Lastname)
        {
            ViewBag.Email = (Email);
            ViewBag.UserId = enc.Decrypt(UserId);
            ViewBag.Firstname = (Firstname);
            ViewBag.Lastname = (Lastname);

            string path = ViewBag.Serverurl = serverpath + "/account/verification?uid=" + UserId;
            ViewBag.Serverurl = path;

            return Populate(x =>
            {
                x.Subject = "Email verification from PronabPal";
                x.ViewName = "Useractivation";
                x.To.Add((Email));
                //x.To.Add((useremail));
            });
        }

        public virtual MvcMailMessage Userforgetpassword(string password, string UserId, string EmailId, string FName, string LName)
        {
            ViewBag.password = (password);
            ViewBag.FName = (FName);
            ViewBag.LName = (LName);
            ViewBag.UserId = enc.Decrypt(UserId);
            ViewBag.EmailId = enc.Decrypt(EmailId);
            string path = ViewBag.Serverurl = serverpath + "/Account/ResetPassword?uid=" + UserId;
            ViewBag.Serverurl = path;

            return Populate(x =>
            {
                x.Subject = "Reset Password for PronabPal";
                x.ViewName = "ForgetPassworduser";
                x.To.Add(ViewBag.EmailId);

            });
        }

 	}
}