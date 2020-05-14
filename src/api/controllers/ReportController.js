const validator = require('../../utils/validator');
const service = require('../services/ReportService');

exports.getAllReports = async (req, res) => {
    const reports = await service.getAllReports(req.query);
    await res.json({status: 'success', data: reports});
};

exports.getReportById = async (req, res) => {
    const report = await service.getReportById(req.params.id);
    await res.json({status: 'success', data: report});
};

exports.addReport = async (req, res) => {
    const validate = validator('ReportPost');
    const isValid = validate(req.body);
    if (!isValid) {
        return await res.status(400).json({status: 'fail', error: validate.errors});
    }

    await service.createReport(req.body);
    await res.status(201).json({status: 'success'});
};

exports.updateReport = async (req, res) => {
    const validate = validator('ReportPut');
    const isValid = validate(req.body);
    if (!isValid) {
        return await res.status(400).json({status: 'fail', error: validate.errors});
    }

    try {
        const report = await service.updateReport(req.params.id, req.body);
        await res.status(200).json({status: 'success', data: report});
    } catch (e) {
        return await res.status(404).json({status: 'fail', error: e.message});
    }
};