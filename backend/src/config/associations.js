import logger from "#config/chalk.js";

import Role from "#modules/roles/model/Role.js";
import Category from "#modules/categories/model/Category.js";
import User from "#modules/users/model/User.js";
import UserVerification from "#modules/users/model/UserVerification.js";
import Post from "#modules/posts/model/Post.js";
import Comment from "#modules/comments/model/Comment.js";

// Relación entre User y Role
User.belongsTo(Role, { foreignKey: "role_id" });

// Relación entre UserVerification y User
UserVerification.belongsTo(User, { foreignKey: "user_id" });

// Relación entre Post, User y Category
Post.belongsTo(User, { foreignKey: "user_id" });
Post.belongsTo(Category, { foreignKey: "category_id" });

// Relación entre Comment, Post y User
Comment.belongsTo(Post, { foreignKey: "post_id" });
Comment.belongsTo(User, { foreignKey: "user_id" });

logger.info("Relaciones listas.");
