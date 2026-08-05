import React, { useState } from 'react';
import imgMaskGroup from '../assets/de4732096a2b6da337dd0fde3afe717e1825dbda.svg';
import { ArrowRight, Check, Loader2, Sparkles } from 'lucide-react';
import Velaris from './ui/velaris';

interface FormState {
  fullName: string;
  mobile: string;
  email: string;
  role: string;
}

interface FormErrors {
  fullName?: string;
  mobile?: string;
  email?: string;
  role?: string;
}

export default function AccountForm() {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    mobile: '',
    email: '',
    role: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const roles = [
    'Individual Investor',
    'NRI / OCI',
    'Institution / Corporate',
    'Registered Advisor / Wealth Manager',
    'Other',
  ];

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName = 'Please enter your full name as per Govt. ID';
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\+?[0-9\s-]{8,15}$/.test(form.mobile.trim())) {
      newErrors.mobile = 'Please enter a valid mobile number (e.g., +91 9999999999)';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.role) {
      newErrors.role = 'Please select who you are';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear validation error when typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const benefitItems = [
    'Paperless KYC in minutes',
    'Start from $5,000 — buy in fractions',
    'No foreign bank account needed',
    'Tax & LRS reporting done for you',
  ];

  return (
    <section className="bg-brand-dark py-24 relative overflow-hidden text-white font-sans" id="open-account">
      {/* Animated Background like Footer */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <Velaris 
          height="100%" 
          className="w-full h-full opacity-70" 
          bg="#141518" 
          colors={["#3b82f6", "#2563eb", "#141518", "#f97316"]}
          speed={3.5}
          grain={0.15}
        />
      </div>
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <img src={imgMaskGroup} className="w-full h-full object-cover" alt="" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Branding / Benefits Info */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 w-fit">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span className="text-brand-orange text-xs font-semibold tracking-wider uppercase">
                Open an account
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-display font-medium leading-tight text-white/95">
              Fully digital, regulated in India, your money custodied in India.
            </h2>
            
            <p className="text-gray-450 text-lg leading-relaxed max-w-xl">
              Leave your details and a Voguestock specialist takes it from there.
            </p>

            <ul className="space-y-4 pt-6 relative z-10">
              {benefitItems.map((item, index) => (
                <li key={index} className="flex items-center gap-3 relative z-10">
                  <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-white font-medium text-base sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-6">
            <div className="bg-white text-brand-dark rounded-3xl p-8 sm:p-10 shadow-2xl relative border border-gray-100 overflow-hidden min-h-[500px] flex flex-col justify-center animate-fadeIn">
              
              {!isSubmitted ? (
                <>
                  <h3 className="text-2xl font-display font-medium mb-8 text-brand-dark">
                    Open your global account
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label htmlFor="fullName" className="block text-sm font-semibold text-brand-dark">
                        Full name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="As per Govt. ID"
                        className={`w-full px-4 py-3.5 rounded-xl border bg-white text-brand-dark font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 transition duration-200 ${
                          errors.fullName
                            ? 'border-red-500 focus:ring-red-100'
                            : 'border-gray-200 focus:ring-brand-blue/20 focus:border-brand-blue'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-xs font-semibold text-red-500">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Mobile */}
                    <div className="space-y-2">
                      <label htmlFor="mobile" className="block text-sm font-semibold text-brand-dark">
                        Mobile
                      </label>
                      <input
                        type="text"
                        name="mobile"
                        id="mobile"
                        value={form.mobile}
                        onChange={handleChange}
                        placeholder="+91"
                        className={`w-full px-4 py-3.5 rounded-xl border bg-white text-brand-dark font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 transition duration-200 ${
                          errors.mobile
                            ? 'border-red-500 focus:ring-red-100'
                            : 'border-gray-200 focus:ring-brand-blue/20 focus:border-brand-blue'
                        }`}
                      />
                      {errors.mobile && (
                        <p className="text-xs font-semibold text-red-500">{errors.mobile}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-sm font-semibold text-brand-dark">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        className={`w-full px-4 py-3.5 rounded-xl border bg-white text-brand-dark font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 transition duration-200 ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-100'
                            : 'border-gray-200 focus:ring-brand-blue/20 focus:border-brand-blue'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-xs font-semibold text-red-500">{errors.email}</p>
                      )}
                    </div>

                    {/* I am a */}
                    <div className="space-y-2">
                      <label htmlFor="role" className="block text-sm font-semibold text-brand-dark">
                        I am a
                      </label>
                      <div className="relative">
                        <select
                          name="role"
                          id="role"
                          value={form.role}
                          onChange={handleChange}
                          className={`w-full px-4 py-3.5 rounded-xl border bg-white text-brand-dark font-medium focus:outline-none focus:ring-2 transition duration-200 appearance-none pr-10 ${
                            errors.role
                              ? 'border-red-500 focus:ring-red-100'
                              : 'border-gray-200 focus:ring-brand-blue/20 focus:border-brand-blue'
                          } ${!form.role ? 'text-gray-400' : 'text-brand-dark'}`}
                        >
                          <option value="" disabled hidden>
                            Select one...
                          </option>
                          {roles.map((r, idx) => (
                            <option key={idx} value={r} className="text-brand-dark">
                              {r}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                      {errors.role && (
                        <p className="text-xs font-semibold text-red-500">{errors.role}</p>
                      )}
                    </div>

                    {/* Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-4 bg-brand-orange text-white font-bold py-4 px-6 rounded-xl hover:bg-brand-orange/95 hover:shadow-xl hover:shadow-brand-orange/20 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-85 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <span>Contact us</span>
                          <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Footnote */}
                  <p className="text-[11px] leading-relaxed text-gray-450 text-center mt-6">
                    By continuing you agree to be contacted by Voguestock. Investments are subject to market risks.
                  </p>
                </>
              ) : (
                /* Success Screen */
                <div className="text-center py-8 space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 bg-brand-green/10 border border-brand-green/20 rounded-full flex items-center justify-center mx-auto text-brand-green">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-3xl font-display font-medium text-brand-dark">
                      Application Received!
                    </h3>
                    <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                      Thank you for your interest. A Voguestock specialist will review your details and reach out to you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setForm({ fullName: '', mobile: '', email: '', role: '' });
                      setIsSubmitted(false);
                    }}
                    className="px-6 py-2.5 rounded-xl border border-gray-200 font-bold text-sm text-brand-dark hover:bg-gray-50 transition duration-200 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
