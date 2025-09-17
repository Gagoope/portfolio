import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, DollarSign, FileText, Wrench, Plane, Save } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useRequests } from '../contexts/RequestContext';

const requestTypes = [
  {
    id: 'petty-cash',
    name: 'Petty Cash',
    description: 'Small cash expenses for office supplies, utilities, etc.',
    icon: DollarSign,
    color: 'bg-blue-50 border-blue-200 text-blue-700',
  },
  {
    id: 'travel-imprest',
    name: 'Travel Imprest',
    description: 'Travel advances for business trips and accommodation',
    icon: Plane,
    color: 'bg-green-50 border-green-200 text-green-700',
  },
  {
    id: 'maintenance',
    name: 'Maintenance',
    description: 'Equipment repairs, facility maintenance, and services',
    icon: Wrench,
    color: 'bg-orange-50 border-orange-200 text-orange-700',
  },
];

export function CreateRequest() {
  const { user } = useAuth();
  const { createRequest } = useRequests();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: '',
    title: '',
    description: '',
    amount: '',
    currency: 'USD',
    urgency: 'medium',
    attachments: [] as string[],
  });

  const [dragActive, setDragActive] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;

    createRequest({
      type: formData.type as any,
      title: formData.title,
      description: formData.description,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      requestedBy: user,
      attachments: formData.attachments,
      urgency: formData.urgency as any,
    });

    navigate('/requests');
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const fileNames = Array.from(files).map(file => file.name);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...fileNames],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Request</h1>
        <p className="text-gray-600 mt-1">Submit a new resource request for approval</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Request Type Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {requestTypes.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: type.id }))}
                className={`p-4 border-2 rounded-lg transition-all ${
                  formData.type === type.id
                    ? `${type.color} border-current`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <type.icon className={`h-8 w-8 mx-auto mb-2 ${
                    formData.type === type.id ? 'text-current' : 'text-gray-400'
                  }`} />
                  <h3 className="font-medium text-gray-900">{type.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Request Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Request Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Request Title *
              </label>
              <input
                type="text"
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of your request"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Provide detailed information about your request, including justification and expected outcomes"
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Amount *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  id="amount"
                  required
                  min="0"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                id="currency"
                value={formData.currency}
                onChange={(e) => setFormData(prev => ({ ...prev, currency: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="urgency" className="block text-sm font-medium text-gray-700 mb-2">
                Urgency Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'low', label: 'Low', color: 'border-green-200 text-green-700' },
                  { value: 'medium', label: 'Medium', color: 'border-yellow-200 text-yellow-700' },
                  { value: 'high', label: 'High', color: 'border-red-200 text-red-700' },
                ].map((urgency) => (
                  <button
                    key={urgency.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, urgency: urgency.value }))}
                    className={`p-3 border-2 rounded-lg transition-all ${
                      formData.urgency === urgency.value
                        ? `${urgency.color} border-current bg-current bg-opacity-10`
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="font-medium">{urgency.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* File Attachments */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Attachments</h2>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              Drag and drop files here, or{' '}
              <label className="text-blue-600 hover:text-blue-700 cursor-pointer">
                browse
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                />
              </label>
            </p>
            <p className="text-sm text-gray-500">
              Support for PDF, DOC, DOCX, JPG, PNG files (Max 10MB each)
            </p>
          </div>

          {formData.attachments.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Attached Files:</h3>
              <div className="space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-700">{file}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        attachments: prev.attachments.filter((_, i) => i !== index)
                      }))}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!formData.type || !formData.title || !formData.description || !formData.amount}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Save className="h-5 w-5" />
            <span>Submit Request</span>
          </button>
        </div>
      </form>
    </div>
  );
}