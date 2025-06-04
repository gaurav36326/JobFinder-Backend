import Company from "../models/company";


const registerCompany = async (req, res) => {

    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "name feild is mandatory",
                success: false
            })
        }

        const isCompanyExist = await Company.findOne({ name });

        if (isCompanyExist) {
            return res.status(400).json({
                message: "Company alreay exist with this credentials",
                success: false
            })
        }

        const company = new Company({ name, userId:req.user._id});

        await company.save();

        return res.status(200).json({
            message: "Company registered sucessfully ",
            success: true
        })



    } catch (error) {
        return res.status(400).json({
            message: "Error while registered a company",
            success: false
        })
    }

}

const getCompany =async (req,res)=>{
        try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

const getCompanyById =async (req,res)=>{
      try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


const updateCompany = async (req, res) => {

    try {

        const allowedEditableFeilds = ["name", "description", "website", "location", "logo"];

        // const { name, description, website, location ,logo } = req.body;

        Object.keys(req.body).forEach(
            key => {
                if (allowedEditableFeilds.includes(key)) {
                    return res.status(400).json({
                        message: "Unspecified Feild",
                        success: false
                    })
                }
            }
        )

        const updatedComapny = await Company.findOneAndUpdate({ name },req.body,{new : true});

        return res.status(200).json({
            message: "Company registered sucessfully ",
            success: true
        })



    } catch (error) {
        return res.status(400).json({
            message: "Error while updating the company",
            success: false
        })
    }

}