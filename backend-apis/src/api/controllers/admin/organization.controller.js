const OrganizationType = require("../../models/organizationType.model");
const { checkDuplicate } = require("../../../config/errors");

// API to create Organization Type
exports.createType = async (req, res, next) => {
  try {
    let payload = req.body;
    if (req.files)
      for (const key in req.files) {
        const image = req.files[key][0];
        payload[`${key}`] = image.filename;
      }

    const organizationType = await OrganizationType.create(payload);
    return res.send({
      success: true,
      message: "Organization type created successfully",
      organizationType,
    });
  } catch (error) {
    if (error.code === 11000 || error.code === 11001)
      checkDuplicate(error, res, "Organization Type");
    else return next(error);
  }
};

// API to edit Organization Type
exports.editType = async (req, res, next) => {
  try {
    let payload = req.body;
    if (req.files)
      for (const key in req.files) {
        const image = req.files[key][0];
        payload[`${key}`] = image.filename;
      }
    const organizationType = await OrganizationType.findByIdAndUpdate(
      { _id: payload._id },
      { $set: payload },
      { new: true }
    );
    return res.send({
      success: true,
      message: "Organization type updated successfully",
      organizationType,
    });
  } catch (error) {
    if (error.code === 11000 || error.code === 11001)
      checkDuplicate(error, res, "Organization Type");
    else return next(error);
  }
};

// API to delete Organization Type
exports.deleteType = async (req, res, next) => {
  try {
    const { typeId } = req.params;
    if (typeId) {
      const organizationType = await OrganizationType.deleteOne({
        _id: typeId,
      });
      if (organizationType && organizationType.deletedCount)
        return res.send({
          success: true,
          message: "Organization type deleted successfully",
          typeId,
        });
      else
        return res.status(400).send({
          success: false,
          message: "Organization type not found for given Id",
        });
    } else
      return res
        .status(400)
        .send({ success: false, message: "Organization type Id is required" });
  } catch (error) {
    return next(error);
  }
};

// API to get Organization Type
exports.getType = async (req, res, next) => {
  try {
    const { typeId } = req.params;
    if (typeId) {
      let organizationType = await OrganizationType.findOne({
        _id: typeId,
      }).lean(true);
      if (organizationType)
        return res.json({
          success: true,
          message: "Organization type retrieved successfully",
          organizationType,
        });
      else
        return res.status(400).send({
          success: false,
          message: "Organization type not found for given Id",
        });
    } else
      return res
        .status(400)
        .send({ success: false, message: "Organization type Id is required" });
  } catch (error) {
    return next(error);
  }
};

// API to list Organization Type
exports.listTypes = async (req, res, next) => {
  try {
    let { all, page, limit } = req.query;
    const filter = {};
    let name = req.query.name;
    if (name) {
      name = name.trim();
      filter.name = {
        $regex: name.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
        // $regex: name.replace(/\s/g, ""),
        $options: "i",
      };
    }

    page = page !== undefined && page !== "" ? parseInt(page) : 1;
    if (!all)
      limit = limit !== undefined && limit !== "" ? parseInt(limit) : 10;

    const total = await OrganizationType.countDocuments({ filter });

    if (page > Math.ceil(total / limit) && total > 0)
      page = Math.ceil(total / limit);

    let pipeline = [{ $match: filter }, { $sort: { createdAt: -1 } }];

    if (!all) {
      pipeline.push({ $skip: limit * (page - 1) });
      pipeline.push({ $limit: limit });
    }

    const organizationTypes = await OrganizationType.aggregate(pipeline);

    return res.send({
      success: true,
      message: "Organization type fetched successfully",
      data: {
        organizationTypes,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit) <= 0 ? 1 : Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    return next(error);
  }
};

//
