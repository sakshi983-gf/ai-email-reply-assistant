import API from "./api";

export const generateEmailReply = (data) => {
  return API.post("/emails/generate", data);
};

export const sendEmailReply = (data) => {
  return API.post("/emails/send", data);
};

export const getSentEmails = () => {
  return API.get("/emails/sent");
};

export const searchSentEmails = (query) => {
  return API.get(`/emails/search?q=${query}`);
};

export const saveEmailDraft = (data) => {
  return API.post("/drafts", data);
};