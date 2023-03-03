const SurveyQuestionType = {
  '1': 'RadioBox',
  '2': 'CheckBox',
  '3': 'TextInput',
}

export const SurveyOptions = {
  noTextImage: {
    directAdd: true,
    completePopup: false,
    commentShow: false,
    commentRequired: false,
    imageShow: false,
    imageRequired: false,
  },
  textOptional: {
    directAdd: true,
    completePopup: true,
    commentShow: true,
    commentRequired: false,
    imageShow: false,
    imageRequired: false,
  },
  textRequired: {
    directAdd: false,
    completePopup: true,
    commentShow: true,
    commentRequired: true,
    imageShow: false,
    imageRequired: false,
  },
  textWithImageOptional: {
    directAdd: true,
    completePopup: true,
    commentShow: true,
    commentRequired: false,
    imageShow: true,
    imageRequired: false,
  },
  textWithImageRequired: {
    directAdd: false,
    completePopup: true,
    commentShow: true,
    commentRequired: true,
    imageShow: true,
    imageRequired: true,
  },
};
