const emailTemplates = {
  forgotPassword:
    "<p>To reset your password click this link:</p><p>&nbsp;${url}</p><p>If you didn’t ask to reset your password, you can ignore this email.</p><p>Thanks,</p>",
  verifyEmail:
    "<p>Hello ${email} :</p><p>To verify your email click this link:</p><p>&nbsp;${url}</p><p>If you already verify your email, you can ignore this email.</p><p>Thanks,</p>",
  approved:
    "<p>Hello ${email} :</p><p> Congratulations ${userName}.Your request to join ${organizationName} has been approved</p>",
  //   approved: "Organization Joining Request Approved",
  rejected:
    "<p>Hello ${email} :</p><p> Hello ${userName}.Your have been rejected to join organization ${organizationName}.</p>",
  invitation:
    "<p>Hello ${email} :</p><p>You have been invited to join organization ${organizationName}. In order to accept the invitation click this link:</p><p>&nbsp;${url}</p><p>Thanks,</p>",
  approvedUserRequest:
    "<p>Hello ${email} :</p><p>You have been approved to join organization ${organizationName}. ,</p>",
};

exports.templates = async (key) => {
  return emailTemplates[key] || "";
};
