const reportModel = require('../models/ReportModel');

exports.getAllReports = async (params) => {
    let {objectId} = params;
    if (!objectId) {
        return await reportModel.findAll();
    }
    return await reportModel.findAllByObjectId(objectId);
};

exports.getReportById = async (reportId) => {
    return await reportModel.find(reportId);
};

exports.createReport = (reportDTO) => {
    return reportModel.create(reportDTO);
};

exports.updateReport = async (reportId, reportDTO) => {
    const report = await reportModel.find(reportId);
    if (report.length === 0) {
        throw new Error(`Report id=${reportId} not found!`);
    }

    // we will merge only parent level data(report)
    delete report[0].observations;
    const data = {...report[0], ...reportDTO};

    return reportModel.update(data);
};