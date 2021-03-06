USE [PronabPal]
GO
/****** Object:  StoredProcedure [dbo].[ExecuteQueryPageWise]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create Procedure [dbo].[ExecuteQueryPageWise]
(
@Qry nvarchar(max)='',
@OrderBy nvarchar(Max),
@ASCDESC varchar(20)='DESC',
@Page bigint=1,
@rowsPerPage  bigint=10
)
as
begin
declare @SQLQuery AS NVARCHAR(MAX)
declare @TOTALPage as bigint;
declare @TOTAL as bigint;
declare @ParaDefination nvarchar(Max)
declare @pageNum as bigint; 
set @pageNum=@Page; 

--select @TOTAL=COUNT(Restaurant_Id) from view_RestaurantList where Status=1 and Restaurant_Type=@Restaurant_Type and (Address like '%'+@Address+'%' or City like '%'+@Address+'%' or State like '%' + @Address + '%' or Country like '%' + @Address + '%');
set @ParaDefination='@TOTAL bigint=0 output'
--Set @SQLQuery='select @TOTAL=COUNT(Restaurant_Id) from view_RestaurantList where Status=1 and Restaurant_Type=@Restaurant_Type and  (Address like ''%'+@Address+'%'' or City like ''%'+@Address+'%'' or State like ''%' + @Address + '%'' or Country like ''%' + @Address + '%'')'+ @Filter;
set @SQLQuery ='Select @TOTAL=Count(*) from ('+@Qry+') A'

print @SQLQuery
EXECUTE sp_executesql @SQLQuery,@ParaDefination,@TOTAL output;
print @TOTAL

Set @SQLQuery='With SQLPaging As   ( 
    Select Top(@rowsPerPage * @pageNum) ROW_NUMBER() OVER (ORDER BY '+@OrderBy+' '+@ASCDESC+') 
    as RowNum, * 
    FROM ('+@Qry+') A' 
	
	set @SQLQuery=@SQLQuery+') select * from SQLPaging with (nolock) where RowNum > ((@pageNum - 1) * @rowsPerPage) order by RowNum ASC'
	set @ParaDefination='@rowsPerPage bigint,@pageNum bigint'		
	EXECUTE sp_executesql @SQLQuery,@ParaDefination,@rowsPerPage,@pageNum;

---------------------------------------------Calculate Pages-------------------------
set @TOTALPage=@TOTAL%@rowsPerPage
		if(@TOTALPage=0)
		begin
			set @TOTALPage=@TOTAL/@rowsPerPage

		end
		else
		begin
			set @TOTALPage=(@TOTAL/@rowsPerPage)+1
		
		end
			SELECT @TOTAL as Total,@TOTALPage as TotalPage
--------------------------------------------------------------------------------------

end












GO
/****** Object:  StoredProcedure [dbo].[Reset_Password]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[Reset_Password]
(
 @UserId nvarchar(50),
 @Password nvarchar(50)=null

)
as
begin
update [dbo].[Login_tbl] set [Password]=@Password where [UserId]=@UserId 
end


GO
/****** Object:  StoredProcedure [dbo].[spp_admin_changePassword]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create proc [dbo].[spp_admin_changePassword]
(
 @UserId varchar(100),
 @Password varchar(100)=null,
 @Confirm_Password varchar(100)=null,
 @newPass varchar(500)=null
)
as
begin
    declare @OldPass varchar(100)
    declare @Status varchar(100)
    select @OldPass=[Password]  from dbo.AdminLogin_tbl where UserId=@UserId
    
    if(@newPass<>@Confirm_Password)
    begin
    set @Status='FAILED'
     select 'Password did not match' as Msg,@Status  as [Status]
    end
    else if(@OldPass<>@Password)
    begin 
      set @Status='FAILED'
     select 'Incorrect Old Password' as Msg,@Status  as [Status]
    end
    else
    begin
     update dbo.AdminLogin_tbl set [Password]=@newPass where UserId=@UserId
     set @Status='SUCCESS'
     select 'Password Changed Sucessfully' as Msg,@Status  as [Status]
    end
    
    
end









GO
/****** Object:  StoredProcedure [dbo].[spp_admin_Login]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create proc [dbo].[spp_admin_Login]
(
 @UserId nvarchar(100),
 @Password nvarchar(500)
)
as
begin
 select * from dbo.AdminLogin_tbl where UserId=@UserId and [Password]=@Password
end









GO
/****** Object:  StoredProcedure [dbo].[spp_ChangeUserPassword]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[spp_ChangeUserPassword]
(
 @User_Id varchar(50),
 @CurrPassword varchar(100)=null,
 @Password varchar(100)=null
)
as
begin
    declare @OldPass varchar(100)
    declare @Status varchar(100)
    select @OldPass=[Password]  from [dbo].[Login_tbl] where [UserId]=@User_Id
    
    set @Status='FAILED'
    if(@OldPass<>@CurrPassword)
    begin 
     set @Status='FAILED'
     select 'Current password is incorrect' as Msg,@Status  as [Status]
    end
    else
    begin
     update dbo.[Login_tbl] set [Password]=@Password where [UserId]=@User_Id
     set @Status='SUCCESS'
     select 'Password changed sucessfully' as Msg,@Status  as [Status]
    end
end




GO
/****** Object:  StoredProcedure [dbo].[spp_DeleteSpot]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spp_DeleteSpot] 
(
@Spot_Id int,
@TagId int
)
AS
Begin
BEGIN TRAN t1
Begin try
declare @position int
select @position=Element_ID  from  dbo.Binder where Tag_ID=@TagId and Spot_ID=@Spot_ID
update [dbo].Binder set Element_ID=(Element_ID-1) where Element_ID>@position and Element_ID>1
--delete from [dbo].[spot_tbl] where Spot_ID=@Spot_ID
delete from [dbo].Binder where Tag_ID=@TagId and Spot_ID=@Spot_ID

Commit transaction t1
end try
begin catch
Rollback transaction t1
end catch
end
GO
/****** Object:  StoredProcedure [dbo].[spp_EditAdmin]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[spp_EditAdmin]
(
@UserId varchar(100), 
@Password varchar(100)=null, 
@UserType varchar(100)=null, 
@EmailId nvarchar(500)=null, 
@ContactNo nvarchar(50)=null, 
@Photo nvarchar(50)=null, 
@Name nvarchar(100)=null, 
@Address varchar(max)=null,
@City varchar(50)=null
)
as
begin
Update dbo.AdminLogin_tbl set UserType=@UserType, EmailId=@EmailId, ContactNo=@ContactNo, Photo=@Photo, Name=@Name, [Address]=@Address, City=@City
where UserId=@UserId
end







GO
/****** Object:  StoredProcedure [dbo].[spp_insert_CMS_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[spp_insert_CMS_tbl]
(
@Id int,
@Page_Name varchar(50) = null,
@Meta_Name nvarchar(200)=null,
@Meta_Description nvarchar(max)=null,
@Page_Title varchar(50) = null,
@Page_Heading nvarchar(MAX) = null,
@Page_Content nvarchar(MAX) = null
)
as
begin
update CMS_tbl set [Page_Name]=@Page_Name, Meta_Name=@Meta_Name, Meta_Description=@Meta_Description, [Page_Title]=@Page_Title, [Page_Heading]=@Page_Heading, [Page_Content]=@Page_Content
where [Id] = @Id
end





GO
/****** Object:  StoredProcedure [dbo].[spp_insert_Gallery_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[spp_insert_Gallery_tbl]
(
@GalleryId varchar(50),
@Title varchar(100) = null,
@Image varchar(50) = null
)
as
begin
insert into Gallery_tbl
([GalleryId],[Title],[Image],[Entrydate])
values
(@GalleryId,@Title,@Image,GETDATE())
end










GO
/****** Object:  StoredProcedure [dbo].[spp_insert_Slider_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[spp_insert_Slider_tbl]
(
@Slider_Id varchar(50),
@Slider_Image varchar(50) = null
--@Title varchar(200) = null,
--@Sub_Title varchar(200) = null,
--@Short_desc varchar(500) = null
)
as
begin
If not exists (select * from Slider_tbl where [Slider_Id]=@Slider_Id)
begin
insert into Slider_tbl
([Slider_Id],[Slider_Image],[Entry_date],[Status])
values
(@Slider_Id,@Slider_Image,GETDATE(),1)
end
else
begin
update Slider_tbl set [Slider_Image]=@Slider_Image where [Slider_Id] = @Slider_Id
end
end
GO
/****** Object:  StoredProcedure [dbo].[spp_insert_Social_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[spp_insert_Social_tbl]
(
@Id int,
@Facebook nvarchar(100) = null,
@Twitter nvarchar(100) = null,
@Instagram nvarchar(100)=null,
@Youtube nvarchar(100) = null,
@Address varchar(MAX) = null,
@Contact varchar(20) = null,
@Email varchar(50) = null,
@Map text = null
)

as
begin
update Social_tbl set  [Facebook]=@Facebook, [Twitter]=@Twitter, Instagram=@Instagram ,[Youtube]=@Youtube,[Address]=@Address,[Contact]=@Contact,[Email]=@Email,[Map]=@Map
where [Id] = @Id
end

GO
/****** Object:  StoredProcedure [dbo].[spp_Save_Category]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[spp_Save_Category]
(
@CategoryId varchar(50),
@CategoryName varchar(100),
@Image varchar(100)
)
as
begin
if Exists(select * from category_tbl where CategoryId=@CategoryId)
begin
update category_tbl set CategoryName=@CategoryName, [Image]=@Image where CategoryId=@CategoryId
end
else
begin
insert into category_tbl
(CategoryId,CategoryName,[Image],EntryDate,[Status])
values
(@CategoryId,@CategoryName,@Image,GETDATE(),1)
end
end
GO
/****** Object:  StoredProcedure [dbo].[spp_Save_SEOData]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[spp_Save_SEOData]
(
@SEOId varchar(50),
@PageName varchar(50),
@ViewName varchar(50),
@PageTitle varchar(200),
@MetaCanonical varchar(max) = null,
@MetaRobots varchar(max)=null,
@MetaDescription varchar(max)=null,
@google_site_verification varchar(400)=null
)
as
begin
if Exists(select * from SEO_tbl where SEOId=@SEOId)
begin
update SEO_tbl set PageName=@PageName, ViewName=@ViewName,PageTitle=@PageTitle, MetaCanonical=@MetaCanonical, MetaRobots=@MetaRobots, MetaDescription=@MetaDescription, google_site_verification=@google_site_verification
where SEOId = @SEOId
end
else
begin
insert into SEO_tbl
(SEOId,PageName,ViewName,PageTitle,MetaCanonical,MetaRobots,MetaDescription,google_site_verification,EntryDate,[Status])
values
(@SEOId,@PageName,@ViewName,@PageTitle,@MetaCanonical,@MetaRobots,@MetaDescription,@google_site_verification,GETDATE(),1)
end
end


GO
/****** Object:  StoredProcedure [dbo].[spp_Save_Spot]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[spp_Save_Spot]
(
@Spot_Id int,
@CategoryId varchar(50),
@Dictum_ID int=null,
@Spot_Name varchar(200)=null,
@Spot_Type varchar(50)=null,
@Description varchar(max)=null,
@Canvas_Sketch text =null,
@SpotImage varchar(100)=null
)
as
begin
declare @count int

insert into [dbo].[spot_tbl]
(Spot_Id,CategoryId,Spot_Name,Spot_Type,[Description],Canvas_Sketch,SpotImage,EntryDate,[Status])
values
(@Spot_Id,@CategoryId,@Spot_Name,@Spot_Type,@Description,@Canvas_Sketch,@SpotImage,GETDATE(),1)

if(isnull(@Dictum_ID, '') != '')

begin
insert into [dbo].[Binder] (Spot_Id,Tag_ID) values (@Spot_Id,@Dictum_ID)

set @count=(select count(*) from [dbo].[Binder] where Tag_ID=@Dictum_ID)
update [dbo].[Binder] set Element_ID=@count where Tag_ID=@Dictum_ID and Spot_Id=@Spot_Id
end

end
GO
/****** Object:  StoredProcedure [dbo].[spp_Save_Spot_Backup]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [dbo].[spp_Save_Spot_Backup]
(
@Spot_Id int,
@Dictum_ID int=null,
@Spot_Name varchar(200)=null,
@Spot_Type varchar(50)=null,
@Description varchar(max)=null,
@Canvas_Sketch text =null,
@SpotImage varchar(100)=null
)
as
begin
declare @count int,@x int, @ExistDictum int

if Exists(select * from [dbo].[spot_tbl] where Spot_Id=@Spot_Id)
begin

update [dbo].[spot_tbl] set Spot_Name=@Spot_Name, Spot_Type=@Spot_Type,
[Description]=@Description, Canvas_Sketch=@Canvas_Sketch, SpotImage=@SpotImage where Spot_Id=@Spot_Id

if(isnull(@Dictum_ID, '') != '')
select @count=count(BinderID) from [dbo].[Binder] where Tag_ID=@Dictum_ID

if(@count = 0)
begin
set @x=@count+1
update [dbo].[Binder] set Tag_ID=@Dictum_ID, Element_ID=@x where Spot_Id=@Spot_Id
end

else
begin
select @count=count(BinderID) from [dbo].[Binder] where Tag_ID=@Dictum_ID
select @ExistDictum=Tag_ID from [dbo].[Binder] where Spot_ID=@Spot_Id

if(@ExistDictum != @Dictum_ID)
begin
set @x=@count+1
update [dbo].[Binder] set Tag_ID=@Dictum_ID, Element_ID=@x where Spot_Id=@Spot_Id
end
end

end

else
begin

insert into [dbo].[spot_tbl]
(Spot_Id,Spot_Name,Spot_Type,[Description],Canvas_Sketch,SpotImage,EntryDate,[Status])
values
(@Spot_Id,@Spot_Name,@Spot_Type,@Description,@Canvas_Sketch,@SpotImage,GETDATE(),1)

if(isnull(@Dictum_ID, '') != '')
select @count=count(BinderID) from [dbo].[Binder] where Tag_ID=@Dictum_ID
set @x=@count+1
begin
insert into [dbo].[Binder] (Spot_Id,Tag_ID,Element_ID) values (@Spot_Id,@Dictum_ID,@x)
end

end
end

--EXEC [dbo].[spp_Save_Spot] '391052674','966976708','Demo Spot test','Question','<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages</p>\r\n','391052674.jpg','17052018145807194_46.jpg'
GO
/****** Object:  StoredProcedure [dbo].[spp_SaveDictum]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [dbo].[spp_SaveDictum]
(
@Dictum_ID int,
@Phrase nvarchar(200) = null,
@Description nvarchar(max) = null
)
as
begin
if Exists(select * from Dictum where Dictum_ID=@Dictum_ID)
begin
update Dictum set Phrase=@Phrase, [Description]=@Description where Dictum_ID = @Dictum_ID
end
else
begin
insert into Dictum
(Dictum_ID,Phrase,[Description],[EntryDate],[Status])
values
(@Dictum_ID,@Phrase,@Description,GETDATE(),1)
end
end
GO
/****** Object:  StoredProcedure [dbo].[spp_SaveFlow]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[spp_SaveFlow]
(
@Flow_Id varchar(50),
--@Spot_Id varchar(50) = null,
@Flow_No varchar(50) = null,
@Flow_Title varchar(200) = null,
@Short_Description varchar(500) = null,
@Description text = null,
@Author varchar(50) = null,
--@Flow_Date datetime = null,
@Tags varchar(50) = null,
@Canvas_Sketch text = null,
@Image_Video varchar(50) = null
)
as
begin
if Exists(select * from flow_tbl where Flow_Id=@Flow_Id)
begin
update flow_tbl set [Flow_No]=@Flow_No, [Flow_Title]=@Flow_Title, 
[Short_Description]=@Short_Description, [Description]=@Description, [Author]=@Author, [Flow_Date]=GETDATE(), [Tags]=@Tags, 
[Canvas_Sketch]=@Canvas_Sketch, [Image_Video]=@Image_Video where [Flow_Id] = @Flow_Id
end
else
begin
insert into flow_tbl
([Flow_Id],[Flow_No],[Flow_Title],[Short_Description],[Description],[Author],[Flow_Date],[Tags],[Canvas_Sketch],[Image_Video],[EntryDate],[Status])
values
(@Flow_Id,@Flow_No,@Flow_Title,@Short_Description,@Description,@Author,GETDATE(),@Tags,@Canvas_Sketch,@Image_Video,GETDATE(),1)
end
end
GO
/****** Object:  StoredProcedure [dbo].[spp_Savespotinflow]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[spp_Savespotinflow]
(
@Dictum_ID int,
@Spot_Id int
)
as
begin
declare @count int,@x int

if not Exists(select * from [dbo].[Binder] where Tag_ID=@Dictum_ID and Spot_Id=@Spot_Id)
begin

if(isnull(@Dictum_ID, '') != '')
begin

insert into [dbo].[Binder] (Spot_Id,Tag_ID) values (@Spot_Id,@Dictum_ID)

set @count=(select count(*) from [dbo].[Binder] where Tag_ID=@Dictum_ID)
update [dbo].[Binder] set Element_ID=@count where Spot_Id=@Spot_Id

end
end
end

--Exec [dbo].[spp_Savespotinflow] '846428235','122162070'

--select * from [dbo].[Binder] where Spot_Id='122162070' and Tag_ID='846428235'
GO
/****** Object:  StoredProcedure [dbo].[spp_SignUp]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[spp_SignUp]
(
@UserId varchar(50),
@UserName varchar(50) = null,
@FirstName nvarchar(100) = null,
@LastName nvarchar(100) = null,
@EmailId nvarchar(500) = null,
@Phone varchar(50) = null,
@Password nvarchar(500) = null,
@Lat float = null,
@Lng float = null,
@Address varchar(500) = null
)
as
begin
insert into Login_tbl
([UserId],[UserName],[FirstName],[LastName],[EmailId],[Phone],[Password],[Lat],[Long],[UserType],[Address],[User_AStatus],[Registered_By],[create_date],[Status])
values
(@UserId,@UserName,@FirstName,@LastName,@EmailId,@Phone,@Password,@Lat,@Lng,'User',@Address,'Active','Web',GETUTCDATE(),1)
end


GO
/****** Object:  StoredProcedure [dbo].[spp_Spot_SortOrder]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE Procedure [dbo].[spp_Spot_SortOrder] 
(
@Spot_Id int,
@Element_ID int
)
as
begin
declare @OldElementId int, @OldTagId int, @OldSpotId int, @NewTagId int

select @NewTagId=Tag_ID from [dbo].Binder where Spot_ID=@Spot_Id

select @OldElementId=Element_ID from [dbo].Binder where Tag_ID=@NewTagId and Spot_Id=@Spot_Id
select @OldSpotId=Spot_ID from [dbo].Binder where Element_ID=@Element_ID and Tag_ID=@NewTagId

------------------------------------

update [dbo].Binder set Element_ID=@Element_ID where Tag_ID=@NewTagId and Spot_ID=@Spot_Id
print @OldElementId
update [dbo].Binder set Element_ID=@OldElementId where Spot_ID=@OldSpotId and Tag_ID=@NewTagId

end

GO
/****** Object:  StoredProcedure [dbo].[spp_Spot_SortOrderBackup]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

Create Procedure [dbo].[spp_Spot_SortOrderBackup] 
(
@Spot_Id int,
@Element_ID int
)
as
begin
declare @replacewith int,@rpstid bigint,@count int,@x int,@TagId int

declare @tmp as table(Row int identity,Spot_ID int,Element_ID int)

select @replacewith=Element_ID from [dbo].Binder where Spot_ID=@Spot_Id
select @TagId=Tag_ID from [dbo].Binder where Spot_ID=@Spot_Id

if(@replacewith<@Element_ID)
begin

insert into @tmp(Spot_ID, Element_ID)select Spot_ID,Element_ID from [dbo].Binder where Element_ID>@replacewith and Element_ID<=@Element_ID order by Element_ID Asc
select * from @tmp
select @count=count(Spot_ID) from @tmp
set @x=1
while (@x<=@count)
begin
if(Exists(Select * from [dbo].Binder where Spot_ID in (select Spot_ID from @tmp where Row=@x)))
begin
update [dbo].Binder set Element_ID=Element_ID-1 where Spot_ID in (select Spot_ID from @tmp where Row=@x) and Tag_ID=@TagId
end
else
begin
insert [dbo].Binder (Spot_ID, Element_ID) select Spot_ID, Element_ID-1  from @tmp where Row=@x 
end
set @x=@x+1
end
end

else if(@replacewith>@Element_ID)
begin

insert into @tmp(Spot_ID,Element_ID)select Spot_ID,Element_ID from [dbo].Binder where Element_ID>=@Element_ID and Element_ID<@replacewith  order by Element_ID Asc
select * from @tmp

select @count=count(Spot_ID) from @tmp
set @x=1
while (@x<=@count)
begin
if(Exists(Select * from [dbo].Binder where Spot_ID in (select Spot_ID from @tmp where Row=@x)))
begin
update [dbo].Binder set Element_ID=Element_ID+1 where Spot_ID in (select Spot_ID from @tmp where Row=@x) and Tag_ID=@TagId
end
else
begin
insert [dbo].Binder (Spot_ID,Element_ID) select Spot_ID,Element_ID+1 from @tmp where Row=@x 
end
set @x=@x+1
end

end

--update [dbo].Binder set Element_ID=@Element_ID where Spot_ID=@Spot_Id and Tag_ID=@TagId
end


GO
/****** Object:  StoredProcedure [dbo].[spp_Update_Spot]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE proc [dbo].[spp_Update_Spot]
(
@Spot_Id int,
@CategoryId varchar(50),
@Dictum_ID int=null,
@Spot_Name varchar(200)=null,
@Spot_Type varchar(50)=null,
@Description varchar(max)=null,
@Canvas_Sketch text =null,
@SpotImage varchar(100)=null
)
as
begin
declare @count int,@x int

if Exists(select * from [dbo].[spot_tbl] where Spot_Id=@Spot_Id)
begin

update [dbo].[spot_tbl] set CategoryId=@CategoryId, Spot_Name=@Spot_Name, Spot_Type=@Spot_Type,
[Description]=@Description, Canvas_Sketch=@Canvas_Sketch, SpotImage=@SpotImage where Spot_Id=@Spot_Id 

if(isnull(@Dictum_ID, '') != '')
begin
print 1
if not Exists(select * from [dbo].[Binder] where Spot_Id=@Spot_Id)
begin
insert into [dbo].[Binder] (Spot_Id,Tag_ID) values (@Spot_Id,@Dictum_ID)
print 2
set @count=(select count(*) from [dbo].[Binder] where Tag_ID=@Dictum_ID)
update [dbo].[Binder] set Element_ID=@count where Tag_ID=@Dictum_ID and Spot_Id=@Spot_Id
end

else 
begin
print 4
select @x=Tag_ID from [dbo].[Binder] where Spot_Id=@Spot_Id
print @x
print  @Dictum_ID
if(@x !=@Dictum_ID)
begin
print 5

set @count=(select count(*) from [dbo].[Binder] where Tag_ID=@Dictum_ID)
update [dbo].[Binder] set Element_ID=@count+1, Tag_ID=@Dictum_ID where Spot_Id=@Spot_Id
end

end

end
end

end

GO
/****** Object:  StoredProcedure [dbo].[spp_UpdateUserProfile]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE proc [dbo].[spp_UpdateUserProfile]
(
@UserId varchar(50),
@UserName varchar(50) = null,
@FirstName nvarchar(100) = null,
@LastName nvarchar(100) = null,
@EmailId nvarchar(500) = null,
@Phone varchar(50) = null,
@ProfileImage varchar(100) = null
)
as
begin
update Login_tbl set  [UserName]=@UserName, 
[FirstName]=@FirstName, [LastName]=@LastName, [EmailId]=@EmailId, [Phone]=@Phone, 
[ProfileImage]=(case when @ProfileImage<>'' then @ProfileImage else [ProfileImage] end)
where [UserId] = @UserId
end


GO
/****** Object:  Table [dbo].[AdminLogin_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[AdminLogin_tbl](
	[UserId] [varchar](100) NOT NULL,
	[Password] [varchar](100) NULL,
	[UserType] [varchar](100) NULL,
	[EmailId] [nvarchar](500) NULL,
	[ContactNo] [nvarchar](50) NULL,
	[Photo] [nvarchar](50) NULL,
	[Name] [nvarchar](100) NULL,
	[Address] [varchar](max) NULL,
	[City] [varchar](50) NULL,
	[Active_Status] [varchar](20) NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_AdminLogin_tbl] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Binder]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Binder](
	[BinderID] [int] IDENTITY(1,1) NOT NULL,
	[Spot_ID] [int] NULL,
	[Tag_ID] [int] NULL,
	[Element_ID] [int] NULL,
 CONSTRAINT [PK_Binder] PRIMARY KEY CLUSTERED 
(
	[BinderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[category_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[category_tbl](
	[CategoryId] [varchar](50) NOT NULL,
	[CategoryName] [varchar](100) NULL,
	[Image] [varchar](100) NULL,
	[EntryDate] [datetime] NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_category_tbl] PRIMARY KEY CLUSTERED 
(
	[CategoryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CMS_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CMS_tbl](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Page_Name] [varchar](50) NULL,
	[Meta_Name] [nvarchar](200) NULL,
	[Meta_Description] [nvarchar](max) NULL,
	[Page_Title] [varchar](50) NULL,
	[Page_Heading] [nvarchar](max) NULL,
	[Section] [nvarchar](50) NULL,
	[Page_Content] [nvarchar](max) NULL,
 CONSTRAINT [PK_CMS_tbl] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Dictum]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Dictum](
	[Dictum_ID] [int] NOT NULL,
	[Phrase] [nvarchar](200) NULL,
	[Description] [nvarchar](max) NULL,
	[EntryDate] [datetime] NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_Dictum] PRIMARY KEY CLUSTERED 
(
	[Dictum_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[flow_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[flow_tbl](
	[Flow_Id] [varchar](50) NOT NULL,
	[Flow_No] [varchar](50) NULL,
	[Flow_Title] [varchar](200) NULL,
	[Short_Description] [varchar](500) NULL,
	[Description] [text] NULL,
	[Author] [varchar](50) NULL,
	[Flow_Date] [datetime] NULL,
	[Tags] [varchar](50) NULL,
	[Canvas_Sketch] [text] NULL,
	[Image_Video] [varchar](50) NULL,
	[EntryDate] [datetime] NULL,
	[Status] [varchar](50) NULL,
 CONSTRAINT [PK_flow_tbl] PRIMARY KEY CLUSTERED 
(
	[Flow_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Gallery_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING OFF
GO
CREATE TABLE [dbo].[Gallery_tbl](
	[GalleryId] [varchar](50) NOT NULL,
	[Title] [varchar](100) NULL,
	[Image] [varchar](50) NULL,
	[Entrydate] [datetime] NULL,
 CONSTRAINT [PK_Gallery_tbl] PRIMARY KEY CLUSTERED 
(
	[GalleryId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Login_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Login_tbl](
	[UId] [bigint] IDENTITY(1,1) NOT NULL,
	[UserId] [varchar](50) NOT NULL,
	[UserName] [varchar](50) NULL,
	[FirstName] [nvarchar](100) NULL,
	[LastName] [nvarchar](100) NULL,
	[EmailId] [nvarchar](500) NULL,
	[Phone] [varchar](50) NULL,
	[Password] [nvarchar](500) NULL,
	[ProfileImage] [varchar](100) NULL,
	[Lat] [float] NULL,
	[Long] [float] NULL,
	[UserType] [varchar](50) NULL,
	[Address] [varchar](500) NULL,
	[City] [varchar](200) NULL,
	[State] [varchar](50) NULL,
	[Country] [varchar](50) NULL,
	[PostCode] [varchar](50) NULL,
	[CCode] [varchar](50) NULL,
	[DOB] [datetime] NULL,
	[Gender] [varchar](50) NULL,
	[Detail] [nvarchar](max) NULL,
	[Registered_By] [varchar](50) NULL,
	[Email_Verfied] [bit] NULL,
	[create_date] [datetime] NULL,
	[Modify_Date] [datetime] NULL,
	[User_AStatus] [nvarchar](50) NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_Login_tbl] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SEO_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SEO_tbl](
	[SEOId] [varchar](50) NOT NULL,
	[PageName] [varchar](50) NULL,
	[ViewName] [varchar](50) NULL,
	[PageTitle] [varchar](200) NULL,
	[MetaCanonical] [varchar](max) NULL,
	[MetaRobots] [varchar](max) NULL,
	[MetaDescription] [varchar](max) NULL,
	[google_site_verification] [varchar](400) NULL,
	[EntryDate] [datetime] NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_SEO_tbl] PRIMARY KEY CLUSTERED 
(
	[SEOId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Slider_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Slider_tbl](
	[Slider_Id] [varchar](50) NOT NULL,
	[Slider_Image] [varchar](50) NULL,
	[Entry_date] [datetime] NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_Slider_tbl] PRIMARY KEY CLUSTERED 
(
	[Slider_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Social_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Social_tbl](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Facebook] [nvarchar](100) NULL,
	[Twitter] [nvarchar](100) NULL,
	[Googleplus] [nvarchar](100) NULL,
	[Instagram] [nvarchar](100) NULL,
	[Linkedin] [nvarchar](100) NULL,
	[Youtube] [nvarchar](100) NULL,
	[Map] [text] NULL,
	[Address] [nvarchar](max) NULL,
	[Contact] [varchar](20) NULL,
	[Email] [varchar](50) NULL,
 CONSTRAINT [PK_Social_tbl] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[spot_tbl]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[spot_tbl](
	[Spot_Id] [int] NOT NULL,
	[CategoryId] [varchar](50) NULL,
	[Spot_Name] [varchar](200) NULL,
	[Spot_Type] [varchar](100) NULL,
	[Description] [varchar](max) NULL,
	[Canvas_Sketch] [text] NULL,
	[SpotImage] [varchar](50) NULL,
	[EntryDate] [datetime] NULL,
	[Status] [bit] NULL,
 CONSTRAINT [PK_spot_tbl] PRIMARY KEY CLUSTERED 
(
	[Spot_Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  View [dbo].[View_FlowspotList]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[View_FlowspotList]
AS
SELECT        dbo.Dictum.Dictum_ID, dbo.Dictum.Phrase, dbo.Dictum.Description, dbo.Dictum.EntryDate, dbo.Dictum.Status, dbo.Binder.BinderID, dbo.Binder.Spot_ID, 
                         dbo.Binder.Tag_ID, dbo.Binder.Element_ID, dbo.spot_tbl.Spot_Name, dbo.spot_tbl.Spot_Type, dbo.spot_tbl.Description AS SpotDesc, dbo.spot_tbl.Canvas_Sketch, 
                         dbo.spot_tbl.SpotImage, dbo.spot_tbl.Spot_Id AS Expr1
FROM            dbo.Dictum INNER JOIN
                         dbo.Binder ON dbo.Dictum.Dictum_ID = dbo.Binder.Tag_ID INNER JOIN
                         dbo.spot_tbl ON dbo.Binder.Spot_ID = dbo.spot_tbl.Spot_Id

GO
/****** Object:  View [dbo].[View_SpotBinderList]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[View_SpotBinderList]
AS
SELECT        dbo.spot_tbl.Spot_Id, dbo.spot_tbl.Spot_Name, dbo.spot_tbl.Spot_Type, dbo.spot_tbl.Description, dbo.spot_tbl.Canvas_Sketch, dbo.spot_tbl.SpotImage, 
                         dbo.spot_tbl.EntryDate, dbo.spot_tbl.Status, dbo.Binder.Tag_ID
FROM            dbo.Binder INNER JOIN
                         dbo.spot_tbl ON dbo.Binder.Spot_ID = dbo.spot_tbl.Spot_Id

GO
/****** Object:  View [dbo].[View_SpotList]    Script Date: 28 May 2018 9:19:22 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[View_SpotList]
AS
SELECT        dbo.spot_tbl.Spot_Id, dbo.spot_tbl.Spot_Name, dbo.spot_tbl.Spot_Type, dbo.spot_tbl.Description, dbo.spot_tbl.Canvas_Sketch, dbo.spot_tbl.SpotImage, 
                         dbo.spot_tbl.EntryDate, dbo.spot_tbl.Status, dbo.Binder.Tag_ID, dbo.Binder.Element_ID, dbo.Dictum.Phrase, dbo.Dictum.Dictum_ID, dbo.spot_tbl.CategoryId, 
                         dbo.category_tbl.CategoryName
FROM            dbo.category_tbl RIGHT OUTER JOIN
                         dbo.spot_tbl ON dbo.category_tbl.CategoryId = dbo.spot_tbl.CategoryId LEFT OUTER JOIN
                         dbo.Binder INNER JOIN
                         dbo.Dictum ON dbo.Binder.Tag_ID = dbo.Dictum.Dictum_ID ON dbo.spot_tbl.Spot_Id = dbo.Binder.Spot_ID

GO
INSERT [dbo].[AdminLogin_tbl] ([UserId], [Password], [UserType], [EmailId], [ContactNo], [Photo], [Name], [Address], [City], [Active_Status], [Status]) VALUES (N'admin', N'123456', N'Admin', N'admin@gmail.com', N'9876543210', N'23022018171130097_1.png', N'Admin Roy', NULL, N'Kolkata', N'Active', 1)
GO
SET IDENTITY_INSERT [dbo].[Binder] ON 

GO
INSERT [dbo].[Binder] ([BinderID], [Spot_ID], [Tag_ID], [Element_ID]) VALUES (8, 134560767, 12170712, 1)
GO
INSERT [dbo].[Binder] ([BinderID], [Spot_ID], [Tag_ID], [Element_ID]) VALUES (9, 231574870, 12170712, 3)
GO
INSERT [dbo].[Binder] ([BinderID], [Spot_ID], [Tag_ID], [Element_ID]) VALUES (10, 231574870, 846428235, 3)
GO
INSERT [dbo].[Binder] ([BinderID], [Spot_ID], [Tag_ID], [Element_ID]) VALUES (11, 973434980, 846428235, 1)
GO
INSERT [dbo].[Binder] ([BinderID], [Spot_ID], [Tag_ID], [Element_ID]) VALUES (12, 660089323, 12170712, 2)
GO
INSERT [dbo].[Binder] ([BinderID], [Spot_ID], [Tag_ID], [Element_ID]) VALUES (13, 16237516, 846428235, 2)
GO
SET IDENTITY_INSERT [dbo].[Binder] OFF
GO
INSERT [dbo].[category_tbl] ([CategoryId], [CategoryName], [Image], [EntryDate], [Status]) VALUES (N'C191155134', N'ABC', N'21052018152950291_3.jpg', CAST(0x0000A8A300F74568 AS DateTime), 1)
GO
INSERT [dbo].[category_tbl] ([CategoryId], [CategoryName], [Image], [EntryDate], [Status]) VALUES (N'C399738326', N'sd adasd', N'14032018130325233_2.png', CAST(0x0000A8A300D71F1D AS DateTime), 1)
GO
INSERT [dbo].[category_tbl] ([CategoryId], [CategoryName], [Image], [EntryDate], [Status]) VALUES (N'C651468309', N'Spot Category1', N'', CAST(0x0000A8E7010AB3B3 AS DateTime), 1)
GO
SET IDENTITY_INSERT [dbo].[CMS_tbl] ON 

GO
INSERT [dbo].[CMS_tbl] ([Id], [Page_Name], [Meta_Name], [Meta_Description], [Page_Title], [Page_Heading], [Section], [Page_Content]) VALUES (3, N'Home', NULL, NULL, N'About Us', N'About pronab pal space', N'aboutus', N'<p>Pronabpal.space is a site supporting the need and communication around research projects and consulting.  
               We carry on R&amp;D work in various technology categories like AI, Concurrency, Big Data, IOT.</p>
            <ul>
              <li><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lectus nisl,</p></li>
              <li><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lectus nisl,</p></li>
              <li><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lectus nisl,</p></li>
              <li><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lectus nisl,</p></li>
              <li><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer lectus nisl,</p></li>
            </ul>')
GO
INSERT [dbo].[CMS_tbl] ([Id], [Page_Name], [Meta_Name], [Meta_Description], [Page_Title], [Page_Heading], [Section], [Page_Content]) VALUES (1015, N'Home', NULL, NULL, N'easy to learn', N'EASY TO LEARN', N'easytolearn', N'<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>')
GO
INSERT [dbo].[CMS_tbl] ([Id], [Page_Name], [Meta_Name], [Meta_Description], [Page_Title], [Page_Heading], [Section], [Page_Content]) VALUES (1018, N'Home', NULL, NULL, N'Research Category', N'Research Category', N'researchcategory', N'<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>')
GO
INSERT [dbo].[CMS_tbl] ([Id], [Page_Name], [Meta_Name], [Meta_Description], [Page_Title], [Page_Heading], [Section], [Page_Content]) VALUES (1019, N'SignIn', NULL, NULL, N'Sign In', N'Pronab Pal Space Better.', N'signin', N'<h3>Succeed Together.</h3>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>')
GO
INSERT [dbo].[CMS_tbl] ([Id], [Page_Name], [Meta_Name], [Meta_Description], [Page_Title], [Page_Heading], [Section], [Page_Content]) VALUES (1020, N'SignUp', NULL, NULL, N'Sign Up', N'Pronab Pal Space Better.', N'signup', N'<h3>Succeed Together.</h3>

<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&#39;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.</p>
')
GO
SET IDENTITY_INSERT [dbo].[CMS_tbl] OFF
GO
INSERT [dbo].[Dictum] ([Dictum_ID], [Phrase], [Description], [EntryDate], [Status]) VALUES (12170712, N'Flow_1', N'scheduled our appointment next morning and arrived early in the one hour window he provided.', CAST(0x0000A8E2011612E6 AS DateTime), 1)
GO
INSERT [dbo].[Dictum] ([Dictum_ID], [Phrase], [Description], [EntryDate], [Status]) VALUES (846428235, N'Flow_2', N'scheduled our appointment next morning and arrived early in the one hour window he provided.', CAST(0x0000A8E2011401B0 AS DateTime), 1)
GO
INSERT [dbo].[Dictum] ([Dictum_ID], [Phrase], [Description], [EntryDate], [Status]) VALUES (966976708, N'Flow_3', N'scheduled our appointment next morning and arrived early in the one hour window he provided. ', CAST(0x0000A8E201125FF9 AS DateTime), 1)
GO
INSERT [dbo].[flow_tbl] ([Flow_Id], [Flow_No], [Flow_Title], [Short_Description], [Description], [Author], [Flow_Date], [Tags], [Canvas_Sketch], [Image_Video], [EntryDate], [Status]) VALUES (N'F119517464', N'1', N'Test', N'sadjahd', N'<p>sflksdfk</p>
', N'U694237116', CAST(0x0000A8A400B65BFB AS DateTime), N'sdfkjsdfj', N'F119517464.jpg', N'15032018110542858_13.jpg', CAST(0x0000A8A400B65BFB AS DateTime), N'1')
GO
INSERT [dbo].[flow_tbl] ([Flow_Id], [Flow_No], [Flow_Title], [Short_Description], [Description], [Author], [Flow_Date], [Tags], [Canvas_Sketch], [Image_Video], [EntryDate], [Status]) VALUES (N'F549664865', N'2', N'dad adad', N'ad ada d', N'<p>as dad sad&nbsp;</p>
', N'U694237116', CAST(0x0000A8A400B8B20D AS DateTime), N'ad a d', N'F549664865.jpg', N'', CAST(0x0000A8A400B8B20D AS DateTime), N'1')
GO
INSERT [dbo].[flow_tbl] ([Flow_Id], [Flow_No], [Flow_Title], [Short_Description], [Description], [Author], [Flow_Date], [Tags], [Canvas_Sketch], [Image_Video], [EntryDate], [Status]) VALUES (N'F834153531', NULL, N'Creating Custom Validation Attribute in ASP.NET MVC', N'Data validation is intended to provide certain well-defined guarantees for fitness, accuracy, and consistency for various kinds of user input into an application. For business applications, data validation can be defined through declarative data integrity rules or procedure-based business rules. Data that does not conform to these rules will negatively affect business process execution. In ASP.NET MVC applications, System.ComponentModel.DataAnnotations namespace contains various DataAnnotation a', N'<h3>Introduction</h3>

<p>There are four distinct parts to creating a fully functional custom validator that works on both the client and the server. First we subclass ValidationAttribute and add our server side validation logic. Next we implement IClientValidatable on our attribute to allow HTML5 data-* attributes to be passed to the client. Thirdly, we write a custom javascript function that performs validation on the client. Finally, we create an adapter to transform the HTML5 attributes into a format that our custom function can understand. It sounds like a lot of work; but I assure you once you get started you will find it relatively straightforward.</p>

<h3>Getting Started</h3>

<p>For the sake of this tutorial, I&rsquo;ve decided to implemeant a ValidBirthDate attribute that force user to enter a birth date which is less than the current date. Let&rsquo;s begin by creating a new ASP.NET MVC project called CustomValidationAttributeDemo and then create a simple model called Customer.</p>
', N'U694237116', CAST(0x0000A8CD0100B294 AS DateTime), NULL, N'F834153531.jpg', N'25042018153633725_20.jpg', CAST(0x0000A8CD0100B294 AS DateTime), N'1')
GO
INSERT [dbo].[Gallery_tbl] ([GalleryId], [Title], [Image], [Entrydate]) VALUES (N'I832548686', N'asd asdsa', N'23022018171622497_2.jpg', CAST(0x0000A890011CB07B AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[Login_tbl] ON 

GO
INSERT [dbo].[Login_tbl] ([UId], [UserId], [UserName], [FirstName], [LastName], [EmailId], [Phone], [Password], [ProfileImage], [Lat], [Long], [UserType], [Address], [City], [State], [Country], [PostCode], [CCode], [DOB], [Gender], [Detail], [Registered_By], [Email_Verfied], [create_date], [Modify_Date], [User_AStatus], [Status]) VALUES (1, N'U074073248', N'New User', N'New', N'User', N'goigiwebtest@gmail.com', N'7896541230', N'123456', N'09022018163946110_1.jpg', 0, 0, N'User', N'', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Web', 1, CAST(0x0000A87E00661E25 AS DateTime), NULL, N'Active', 1)
GO
INSERT [dbo].[Login_tbl] ([UId], [UserId], [UserName], [FirstName], [LastName], [EmailId], [Phone], [Password], [ProfileImage], [Lat], [Long], [UserType], [Address], [City], [State], [Country], [PostCode], [CCode], [DOB], [Gender], [Detail], [Registered_By], [Email_Verfied], [create_date], [Modify_Date], [User_AStatus], [Status]) VALUES (2, N'U694237116', N'test test2', N'test', N'test2', N'test@gmail.com', N'9765321200', N'123456', NULL, 0, 0, N'User', N'', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Web', 1, CAST(0x0000A89000C58553 AS DateTime), NULL, N'Active', 1)
GO
SET IDENTITY_INSERT [dbo].[Login_tbl] OFF
GO
INSERT [dbo].[SEO_tbl] ([SEOId], [PageName], [ViewName], [PageTitle], [MetaCanonical], [MetaRobots], [MetaDescription], [google_site_verification], [EntryDate], [Status]) VALUES (N'seo325321270', N'SignIn', N'signin', N'PronabPal Sign in Page Title', N'', N'', N'', N'', CAST(0x0000A89100000000 AS DateTime), 1)
GO
INSERT [dbo].[SEO_tbl] ([SEOId], [PageName], [ViewName], [PageTitle], [MetaCanonical], [MetaRobots], [MetaDescription], [google_site_verification], [EntryDate], [Status]) VALUES (N'seo325323370', N'SignUp', N'signup', N'PronabPal Sign up Page Title', N'', N'', N'', N'', CAST(0x0000A89100000000 AS DateTime), 1)
GO
INSERT [dbo].[SEO_tbl] ([SEOId], [PageName], [ViewName], [PageTitle], [MetaCanonical], [MetaRobots], [MetaDescription], [google_site_verification], [EntryDate], [Status]) VALUES (N'seo325326470', N'Home', N'Index', N'PronabPal Home Page Title', N'Home Canonical', N'home robots', N'Home Description', N'home go site verify', CAST(0x0000A88D00BBACF7 AS DateTime), 1)
GO
INSERT [dbo].[Slider_tbl] ([Slider_Id], [Slider_Image], [Entry_date], [Status]) VALUES (N'S398213848', N'24022018102423639_2.jpg', CAST(0x0000A84000EDB7ED AS DateTime), 1)
GO
INSERT [dbo].[Slider_tbl] ([Slider_Id], [Slider_Image], [Entry_date], [Status]) VALUES (N'S857762430', N'24022018102344559_2.jpg', CAST(0x0000A89100AA354E AS DateTime), 1)
GO
SET IDENTITY_INSERT [dbo].[Social_tbl] ON 

GO
INSERT [dbo].[Social_tbl] ([Id], [Facebook], [Twitter], [Googleplus], [Instagram], [Linkedin], [Youtube], [Map], [Address], [Contact], [Email]) VALUES (1, N'https://www.facebook.com/', N'https://www.Twitter.com/', N'https://www.Youtube.com/', N'https://www.Instagram.com/', N'https://www.facebook.com/login/01', N'https://www.Youtube.com/', N'<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26372472.329392266!2d-113.73907545808905!3d36.20800122385797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited+States!5e0!3m2!1sen!2sin!4v1517468015727" width="100%" height="140" frameborder="0" style="border:0" allowfullscreen></iframe>', N'12 street , city , address, state, country, pin', N'(281) 888-8805', N' support@pronabpal.com')
GO
SET IDENTITY_INSERT [dbo].[Social_tbl] OFF
GO
INSERT [dbo].[spot_tbl] ([Spot_Id], [CategoryId], [Spot_Name], [Spot_Type], [Description], [Canvas_Sketch], [SpotImage], [EntryDate], [Status]) VALUES (16237516, N'C651468309', N'Spot 5', N'Observation', N'<p>asd asd asd ad a</p>
', N'16237516.jpg', NULL, CAST(0x0000A8E800B667B1 AS DateTime), 1)
GO
INSERT [dbo].[spot_tbl] ([Spot_Id], [CategoryId], [Spot_Name], [Spot_Type], [Description], [Canvas_Sketch], [SpotImage], [EntryDate], [Status]) VALUES (134560767, N'C399738326', N'Spot 3', N'Answer', N'<p>sdsazd asd</p>
', N'134560767.jpg', NULL, CAST(0x0000A8E700FEBDBC AS DateTime), 1)
GO
INSERT [dbo].[spot_tbl] ([Spot_Id], [CategoryId], [Spot_Name], [Spot_Type], [Description], [Canvas_Sketch], [SpotImage], [EntryDate], [Status]) VALUES (231574870, N'C399738326', N'Spot 4', N'Answer', N'<p>This is demo</p>
', N'231574870.jpg', NULL, CAST(0x0000A8E700EFE428 AS DateTime), 1)
GO
INSERT [dbo].[spot_tbl] ([Spot_Id], [CategoryId], [Spot_Name], [Spot_Type], [Description], [Canvas_Sketch], [SpotImage], [EntryDate], [Status]) VALUES (660089323, N'C191155134', N'Spot 2', N'Question', N'<p>asd asd sad asd</p>
', N'660089323.jpg', N'', CAST(0x0000A8E800AF4330 AS DateTime), 1)
GO
INSERT [dbo].[spot_tbl] ([Spot_Id], [CategoryId], [Spot_Name], [Spot_Type], [Description], [Canvas_Sketch], [SpotImage], [EntryDate], [Status]) VALUES (973434980, N'C191155134', N'Spot 1', N'Answer', N'<p>This is demo</p>
', N'973434980.jpg', NULL, CAST(0x0000A8E700EFB64C AS DateTime), 1)
GO
ALTER TABLE [dbo].[Login_tbl] ADD  CONSTRAINT [DF_Login_tbl_Email_Verfied]  DEFAULT ((0)) FOR [Email_Verfied]
GO
ALTER TABLE [dbo].[Login_tbl] ADD  CONSTRAINT [DF_Login_tbl_Status]  DEFAULT ((1)) FOR [Status]
GO
ALTER TABLE [dbo].[Binder]  WITH CHECK ADD  CONSTRAINT [FK_TagKey] FOREIGN KEY([Tag_ID])
REFERENCES [dbo].[Dictum] ([Dictum_ID])
GO
ALTER TABLE [dbo].[Binder] CHECK CONSTRAINT [FK_TagKey]
GO
ALTER TABLE [dbo].[spot_tbl]  WITH CHECK ADD  CONSTRAINT [FK_spot_tbl_spot_tbl] FOREIGN KEY([Spot_Id])
REFERENCES [dbo].[spot_tbl] ([Spot_Id])
GO
ALTER TABLE [dbo].[spot_tbl] CHECK CONSTRAINT [FK_spot_tbl_spot_tbl]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[40] 4[20] 2[20] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Dictum"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 187
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Binder"
            Begin Extent = 
               Top = 9
               Left = 375
               Bottom = 193
               Right = 545
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "spot_tbl"
            Begin Extent = 
               Top = 6
               Left = 701
               Bottom = 211
               Right = 871
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 15
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'View_FlowspotList'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'View_FlowspotList'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[41] 4[21] 2[11] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Binder"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 157
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "spot_tbl"
            Begin Extent = 
               Top = 0
               Left = 443
               Bottom = 211
               Right = 613
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 10
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewValue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'View_SpotBinderList'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=1 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'View_SpotBinderList'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane1', @value=N'[0E232FF0-B466-11cf-A24F-00AA00A3EFFF, 1.00]
Begin DesignProperties = 
   Begin PaneConfigurations = 
      Begin PaneConfiguration = 0
         NumPanes = 4
         Configuration = "(H (1[46] 4[6] 2[4] 3) )"
      End
      Begin PaneConfiguration = 1
         NumPanes = 3
         Configuration = "(H (1 [50] 4 [25] 3))"
      End
      Begin PaneConfiguration = 2
         NumPanes = 3
         Configuration = "(H (1 [50] 2 [25] 3))"
      End
      Begin PaneConfiguration = 3
         NumPanes = 3
         Configuration = "(H (4 [30] 2 [40] 3))"
      End
      Begin PaneConfiguration = 4
         NumPanes = 2
         Configuration = "(H (1 [56] 3))"
      End
      Begin PaneConfiguration = 5
         NumPanes = 2
         Configuration = "(H (2 [66] 3))"
      End
      Begin PaneConfiguration = 6
         NumPanes = 2
         Configuration = "(H (4 [50] 3))"
      End
      Begin PaneConfiguration = 7
         NumPanes = 1
         Configuration = "(V (3))"
      End
      Begin PaneConfiguration = 8
         NumPanes = 3
         Configuration = "(H (1[56] 4[18] 2) )"
      End
      Begin PaneConfiguration = 9
         NumPanes = 2
         Configuration = "(H (1 [75] 4))"
      End
      Begin PaneConfiguration = 10
         NumPanes = 2
         Configuration = "(H (1[66] 2) )"
      End
      Begin PaneConfiguration = 11
         NumPanes = 2
         Configuration = "(H (4 [60] 2))"
      End
      Begin PaneConfiguration = 12
         NumPanes = 1
         Configuration = "(H (1) )"
      End
      Begin PaneConfiguration = 13
         NumPanes = 1
         Configuration = "(V (4))"
      End
      Begin PaneConfiguration = 14
         NumPanes = 1
         Configuration = "(V (2))"
      End
      ActivePaneConfig = 0
   End
   Begin DiagramPane = 
      Begin Origin = 
         Top = 0
         Left = 0
      End
      Begin Tables = 
         Begin Table = "Binder"
            Begin Extent = 
               Top = 6
               Left = 38
               Bottom = 163
               Right = 208
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "Dictum"
            Begin Extent = 
               Top = 89
               Left = 298
               Bottom = 250
               Right = 468
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "spot_tbl"
            Begin Extent = 
               Top = 0
               Left = 728
               Bottom = 223
               Right = 898
            End
            DisplayFlags = 280
            TopColumn = 0
         End
         Begin Table = "category_tbl"
            Begin Extent = 
               Top = 84
               Left = 503
               Bottom = 213
               Right = 673
            End
            DisplayFlags = 280
            TopColumn = 0
         End
      End
   End
   Begin SQLPane = 
   End
   Begin DataPane = 
      Begin ParameterDefaults = ""
      End
      Begin ColumnWidths = 17
         Width = 284
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 1500
         Width = 2580
         Width = 1500
         Width = 1500
         Width = 1500
      End
   End
   Begin CriteriaPane = 
      Begin ColumnWidths = 11
         Column = 1440
         Alias = 900
         Table = 1170
         Output = 720
         Append = 1400
         NewVal' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'View_SpotList'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPane2', @value=N'ue = 1170
         SortType = 1350
         SortOrder = 1410
         GroupBy = 1350
         Filter = 1350
         Or = 1350
         Or = 1350
         Or = 1350
      End
   End
End
' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'View_SpotList'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_DiagramPaneCount', @value=2 , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'VIEW',@level1name=N'View_SpotList'
GO
