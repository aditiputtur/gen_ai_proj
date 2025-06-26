import React, { useState } from 'react';
import { ChevronRight, Heart, CheckCircle2, AlertCircle } from 'lucide-react';

const HealthSystemsUI = () => {
  const [treatmentInput, setTreatmentInput] = useState('');
  const [generatedSteps, setGeneratedSteps] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  const mockResponse = `After a referral to a cardiologist, here's what usually happens:

1. The clinic will contact you within a few days to schedule your appointment.
2. You may be asked to fill out medical history forms before your visit.
3. Your first appointment usually includes a discussion of your symptoms and medical history.
4. The cardiologist may order tests like an EKG or echocardiogram.
5. Follow-up appointments will be scheduled based on your test results.

Remember to bring your insurance card, a list of current medications, and any previous test results related to your heart condition.`;

  const handleGenerate = async () => {
    const trimmedInput = treatmentInput.trim();
    if (!trimmedInput) return;
    
    setIsLoading(true);
    setIsUsingMockData(false);
    
    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_input: trimmedInput
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        setGeneratedSteps(data.response || data);
        setShowResults(true);
      } else {
        console.error('API request failed with status:', response.status);
        setIsUsingMockData(true);
        setGeneratedSteps(`After a referral to a specialist, here's what usually happens:

1. The specialist's office will contact you within 3-7 business days to schedule your appointment.
2. You may receive paperwork to complete before your visit, including medical history forms.
3. Your first appointment will typically last 45-60 minutes and include a thorough discussion of your symptoms.
4. The specialist may order additional tests or lab work based on your condition.
5. A treatment plan will be discussed, and follow-up appointments scheduled as needed.

Remember to bring your insurance card, referral paperwork, a list of current medications, and any relevant medical records or test results.`);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Error calling API:', error);
      setIsUsingMockData(true);
      setGeneratedSteps(`After a referral to a specialist, here's what usually happens:

1. The specialist's office will contact you within 3-7 business days to schedule your appointment.
2. You may receive paperwork to complete before your visit, including medical history forms.
3. Your first appointment will typically last 45-60 minutes and include a thorough discussion of your symptoms.
4. The specialist may order additional tests or lab work based on your condition.
5. A treatment plan will be discussed, and follow-up appointments scheduled as needed.

Remember to bring your insurance card, referral paperwork, a list of current medications, and any relevant medical records or test results.`);
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setTreatmentInput('');
    setGeneratedSteps('');
    setShowResults(false);
    setIsUsingMockData(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Healthcare Journey</h1>
                <p className="text-gray-600">Step-by-step guide for: <span className="font-semibold text-indigo-600">{treatmentInput}</span></p>
              </div>
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                New Search
              </button>
            </div>

            <div className="space-y-6">
              {isUsingMockData && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-amber-600" />
                    <span className="text-amber-800 font-medium">Demo Mode</span>
                  </div>
                  <p className="text-amber-700 text-sm mt-1">
                    Cannot connect to backend API. Showing sample response for demonstration.
                  </p>
                </div>
              )}
              
              <div className="prose prose-lg max-w-none">
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                  <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                    {generatedSteps}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-6 h-6 text-green-500 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Remember</h3>
                  <p className="text-gray-700 text-sm">
                    This timeline is an estimate and may vary based on your specific situation, insurance, and provider availability. 
                    Always follow the specific instructions given by your healthcare team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="bg-white rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-lg">
            <Heart className="w-10 h-10 text-indigo-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">What Happens Next?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get a clear, step-by-step explanation of your healthcare journey. Reduce anxiety and know what to expect.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-8">
            <div>
              <label className="block text-xl font-bold text-gray-900 mb-4">
                Tell us about your treatment or referral
              </label>
              <textarea
                value={treatmentInput}
                onChange={(e) => setTreatmentInput(e.target.value)}
                placeholder="e.g., I was referred to a cardiologist for chest pain, I need an MRI scan for my knee, I'm scheduled for knee replacement surgery..."
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors resize-none h-32"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!treatmentInput.trim() || isLoading}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                !treatmentInput.trim()
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Getting your guide...</span>
                </>
              ) : (
                <>
                  <span>Get My Step-by-Step Guide</span>
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Heart className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Compassionate Care</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Get empathetic, easy-to-understand guidance in plain language.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Step-by-Step</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Clear, actionable steps to help you navigate your healthcare journey.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <AlertCircle className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900">Reduce Anxiety</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Feel confident and prepared by knowing what to expect next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSystemsUI;