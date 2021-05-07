const ROLES = ['user', 'moderator', 'admin'];
const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const email = await pool.query(
            'SELECT id FROM auditoria.usuario WHERE login=$1',
            [req.body.email]
        );
        if (email)
            return res.status(400).json({ message: "The email already exists" });
        next();
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exist`,
                });
            }
        }
    }

    next();
};

module.exports = { checkDuplicateUsernameOrEmail, checkRolesExisted };