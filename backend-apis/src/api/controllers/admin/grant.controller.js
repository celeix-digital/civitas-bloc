const Category = require("../../models/grantCategories.model");
const { checkDuplicate } = require("../../../config/errors");

// API to create grant category
exports.createCategory = async (req, res, next) => {
  try {
    let payload = req.body;
    if (req.files)
      for (const key in req.files) {
        const image = req.files[key][0];
        payload[`${key}`] = image.filename;
      }

    const category = await Category.create(payload);
    return res.send({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    if (error.code === 11000 || error.code === 11001)
      checkDuplicate(error, res, "Grant Category");
    else return next(error);
  }
};

// // API to edit grant category
exports.editCategory = async (req, res, next) => {
  try {
    if (!req.body._id) {
      return res.send({ success: false, message: "Category Id is required." });
    }
    let payload = req.body;
    if (req.files)
      for (const key in req.files) {
        const image = req.files[key][0];
        payload[`${key}`] = image.filename;
      }
    const category = await Category.findByIdAndUpdate(
      { _id: payload._id },
      { $set: payload },
      { new: true }
    );
    return res.send({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    if (error.code === 11000 || error.code === 11001)
      checkDuplicate(error, res, "Category");
    else return next(error);
  }
};

// // API to delete category
exports.deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (categoryId) {
      const category = await Category.deleteOne({ _id: categoryId });
      if (category && category.deletedCount)
        return res.send({
          success: true,
          message: "Category deleted successfully",
          categoryId,
        });
      else
        return res
          .status(400)
          .send({ success: false, message: "Category not found for given Id" });
    } else
      return res
        .status(400)
        .send({ success: false, message: "Category Id is required" });
  } catch (error) {
    return next(error);
  }
};

// // API to get a grant category
exports.getCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (categoryId) {
      let category = await Category.findOne({ _id: categoryId }).lean(true);
      if (category)
        return res.json({
          success: true,
          message: "Category retrieved successfully",
          category,
        });
      else
        return res
          .status(400)
          .send({ success: false, message: "Category not found for given Id" });
    } else
      return res
        .status(400)
        .send({ success: false, message: "Category Id is required" });
  } catch (error) {
    return next(error);
  }
};

// // API to get grant categories list
exports.listCategories = async (req, res, next) => {
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

    const total = await Category.countDocuments({ filter });

    if (page > Math.ceil(total / limit) && total > 0)
      page = Math.ceil(total / limit);

    let pipeline = [{ $match: filter }, { $sort: { createdAt: -1 } }];

    if (!all) {
      pipeline.push({ $skip: limit * (page - 1) });
      pipeline.push({ $limit: limit });
    }

    const categories = await Category.aggregate(pipeline);

    return res.send({
      success: true,
      message: "Categories fetched successfully",
      data: {
        categories,
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
