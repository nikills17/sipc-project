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

export const ReportsOptions = {
  1: {id: 1, name: 'Building', url: '/building-report-api?is_api=true'},
  2: {
    id: 2,
    name: 'Building Category',
    url: '/building-category-report-api?is_api=true',
  },
  3: {id: 3, name: 'Inspection', url: '/inspection-report-api?is_api=true'},
  4: {id: 4, name: 'Work Order', url: '/workorder-report-api?is_api=true'},
  5: {id: 5, name: 'KPI', url: '/apply-kpi-report-filter?is_api=true'},
};
