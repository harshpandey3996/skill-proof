import React, { useState } from "react";

export default function HelpCenter() {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen bg-black text-gray-200 px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-green-400 mb-4">
          Help Center
        </h1>
        <p className="text-gray-400 mb-10">
          Find answers to common questions and learn how to use SkillProof effectively.
        </p>

        <div className="space-y-8">

            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-3">
              Account & Login
            </h2>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• On the top navigation bar, there are two buttons on the right side. If you have already logged in before, click on the Login button and enter your email ID and password to log in. If you are a new user, click on the Sign Up button, enter your name, email, phone number, password, and confirm password, then click on Sign Up to create your profile.</li>
              
            </ul>
          </div>

          {/* Verification */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-3">
              Skill Verification
            </h2>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• SkillProof is a website created to provide free certificates. It has been developed by Engineer Ayush Mishra and Engineer Harsh Pandey. On this website, you can get certificates for various courses at beginner, intermediate, and advanced levels. To receive a certificate, you need to take a 20-question MCQ test and pass it successfully.</li>
              
            </ul>
          </div>

          {/* Certificates */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-3">
              Certificates
            </h2>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>• You can take a test at any level—Beginner, Intermediate, or Advanced. Each test consists of 20 MCQs. After passing the test, you can view your certificate and download it by clicking the download button. You can also add this certificate to your resume and mention that you have completed this course through SkillProof.</li>
              
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-3">
              Still need help?
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              If you couldn't find your answer, feel free to contact us.
            </p>

            <button
              onClick={() => setShowContact(!showContact)}
              className="bg-green-500 hover:bg-green-600 text-black px-5 py-2 rounded-lg font-medium"
            >
              Contact Support
            </button>

            
            {showContact && (
              <div className="mt-4 bg-black border border-gray-700 rounded-lg p-4 text-sm text-green-400">
                Please call :
                <div className="mt-2">
                    +91 9026468103<br />
                  +91 8957666492 
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
