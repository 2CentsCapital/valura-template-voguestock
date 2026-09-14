import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { ArrowRight, Check, LoaderCircle } from 'lucide-react';
import Velaris from './ui/velaris';
import StoreButtons from './StoreButtons';
import {
  CONTACT,
  LEAD_FROM_NAME,
  LEAD_SUBJECT,
  SIGNUP_URL,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
} from '../config';

type Field = 'fullName' | 'mobile' | 'email';
type Status = 'idle' | 'sending' | 'success' | 'error';

interface FormState {
  fullName: string;
  mobile: string;
  email: string;
  investorType: string;
  botcheck: boolean;
}

type FormErrors = Partial<Record<Field, string>>;

const INVESTOR_TYPES = ['Resident Indian', 'NRI', 'Foreign National'];
const FIELD_ORDER: Field[] = ['fullName', 'mobile', 'email'];

// The live landing's "Open an account" checklist.
const BENEFITS = [
  'Paperless KYC in minutes',
  'Start from $1, buy in fractions',
  'No foreign bank account needed',
  'Tax & LRS reporting done for you',
];

const FORM_COLORS = ['#7a3510', '#a34d0e', '#1a120b', '#ef7e2e'];
const INITIAL_FORM: FormState = { fullName: '', mobile: '', email: '', investorType: 'Resident Indian', botcheck: false };

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  const name = form.fullName.trim();
  if (!name) errors.fullName = 'Please enter your full name.';
  else if (name.length < 2) errors.fullName = 'Please enter your full name as per PAN.';

  const mobile = form.mobile.replace(/[\s()-]/g, '');
  if (!mobile) errors.mobile = 'Please enter your mobile number.';
  else if (!/^\+?\d{10,15}$/.test(mobile)) errors.mobile = 'Please enter a valid mobile number with 10 to 15 digits.';

  const email = form.email.trim();
  if (!email) errors.email = 'Please enter your email address.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) errors.email = 'Please enter a valid email address.';
  return errors;
}

const inputClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3.5 font-medium text-brand-dark placeholder:text-gray-500 transition duration-200 focus:outline-none focus:ring-2 ${
    hasError ? 'border-red-600 focus:ring-red-200' : 'border-gray-200 focus:border-brand-orange focus:ring-brand-orange/25'
  }`;

export default function AccountForm() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [submitError, setSubmitError] = useState('');
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const fieldRefs = {
    fullName: useRef<HTMLInputElement>(null),
    mobile: useRef<HTMLInputElement>(null),
    email: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    if (status === 'success') successHeadingRef.current?.focus();
  }, [status]);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name in errors) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    const found = validate(form);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      fieldRefs[firstInvalid].current?.focus();
      return;
    }

    setStatus('sending');
    setSubmitError('');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: LEAD_SUBJECT,
          from_name: LEAD_FROM_NAME,
          botcheck: form.botcheck,
          'Full name': form.fullName.trim(),
          Mobile: form.mobile.trim(),
          Email: form.email.trim(),
          'Investor type': form.investorType,
        }),
        signal: controller.signal,
      });
      const data = (await response.json().catch(() => null)) as { success?: boolean; message?: string } | null;
      if (response.ok && data?.success) {
        setStatus('success');
      } else {
        setStatus('error');
        setSubmitError(data?.message || "Couldn't send right now. Please try again or WhatsApp us.");
      }
    } catch {
      setStatus('error');
      setSubmitError('Network error: please check your connection and try again.');
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const firstName = form.fullName.trim().split(/\s+/)[0];

  return (
    <section className="on-dark relative overflow-hidden bg-brand-night py-20 font-sans text-white sm:py-24" id="open">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <Velaris height="100%" className="h-full w-full opacity-70" bg="#1a120b" colors={FORM_COLORS} speed={3.5} grain={0.15} />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="flex flex-col justify-center space-y-6 lg:col-span-6">
            <p className="eyebrow eyebrow-on-dark w-fit">Open an account</p>
            <h2 className="font-display text-3xl leading-tight font-medium text-white sm:text-5xl">
              The Voguestock you trust, now with the world inside.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-gray-300">
              Fully digital, regulated in India, your money custodied in India. Leave your details and a Voguestock
              specialist takes it from there.
            </p>
            <ul className="space-y-4 pt-2">
              {BENEFITS.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Check aria-hidden="true" className="h-4 w-4 text-white" />
                  </span>
                  <span className="text-base font-medium text-white sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <p className="mb-3 text-sm font-semibold text-gray-300">Or invest on the go</p>
              <StoreButtons onDark />
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative flex min-h-[500px] flex-col justify-center overflow-hidden rounded-3xl border border-gray-100 bg-white p-6 text-brand-dark shadow-2xl sm:p-10">
              {status === 'success' ? (
                <div className="space-y-6 py-8 text-center" role="status" aria-live="polite">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-brand-green/25 bg-brand-green/10 text-brand-green">
                    <Check aria-hidden="true" className="h-8 w-8" strokeWidth={3} />
                  </div>
                  <div className="space-y-2">
                    <h3 ref={successHeadingRef} tabIndex={-1} className="font-display text-3xl font-medium text-brand-dark">
                      Thanks, {firstName || 'investor'}!
                    </h3>
                    <p className="mx-auto max-w-sm leading-relaxed text-gray-600">
                      Request received. A Voguestock specialist will call within one business day to complete your KYC.
                    </p>
                  </div>
                  <a
                    href={SIGNUP_URL}
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3 font-bold text-brand-dark transition duration-200 hover:bg-brand-orange-soft"
                  >
                    Continue to KYC
                    <ArrowRight aria-hidden="true" className="h-5 w-5" />
                  </a>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-medium text-brand-dark">Open your global account</h3>
                  <p className="mt-1 mb-7 text-sm text-gray-600">Two minutes. No overseas paperwork.</p>

                  <form onSubmit={handleSubmit} noValidate aria-busy={status === 'sending'} className="relative space-y-5">
                    {/* Honeypot: hidden from people, filled in by bots */}
                    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                      <label htmlFor="lead-botcheck">Leave this box unchecked</label>
                      <input
                        id="lead-botcheck"
                        type="checkbox"
                        name="botcheck"
                        tabIndex={-1}
                        autoComplete="off"
                        checked={form.botcheck}
                        onChange={(event) => setForm((prev) => ({ ...prev, botcheck: event.target.checked }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="lead-fullName" className="block text-sm font-semibold text-brand-dark">
                        Full name
                      </label>
                      <input
                        ref={fieldRefs.fullName}
                        id="lead-fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="As per PAN"
                        aria-invalid={errors.fullName ? true : undefined}
                        aria-describedby={errors.fullName ? 'lead-fullName-error' : undefined}
                        className={inputClass(Boolean(errors.fullName))}
                      />
                      {errors.fullName && (
                        <p id="lead-fullName-error" className="text-sm font-semibold text-red-700">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="lead-mobile" className="block text-sm font-semibold text-brand-dark">
                        Mobile
                      </label>
                      <input
                        ref={fieldRefs.mobile}
                        id="lead-mobile"
                        name="mobile"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={form.mobile}
                        onChange={handleChange}
                        placeholder="+91"
                        aria-invalid={errors.mobile ? true : undefined}
                        aria-describedby={errors.mobile ? 'lead-mobile-error' : undefined}
                        className={inputClass(Boolean(errors.mobile))}
                      />
                      {errors.mobile && (
                        <p id="lead-mobile-error" className="text-sm font-semibold text-red-700">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="lead-email" className="block text-sm font-semibold text-brand-dark">
                        Email
                      </label>
                      <input
                        ref={fieldRefs.email}
                        id="lead-email"
                        name="email"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? 'lead-email-error' : undefined}
                        className={inputClass(Boolean(errors.email))}
                      />
                      {errors.email && (
                        <p id="lead-email-error" className="text-sm font-semibold text-red-700">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="lead-investorType" className="block text-sm font-semibold text-brand-dark">
                        I am a
                      </label>
                      <div className="relative">
                        <select
                          id="lead-investorType"
                          name="investorType"
                          value={form.investorType}
                          onChange={handleChange}
                          className={`${inputClass(false)} appearance-none pr-10`}
                        >
                          {INVESTOR_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-600">
                          <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                      </div>
                    </div>

                    {status === 'error' && (
                      <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                        <p>{submitError}</p>
                        <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block underline">
                          {CONTACT.whatsappDisplay}
                        </a>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="group mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-4 font-bold text-brand-dark transition-all duration-200 hover:bg-brand-orange-soft hover:shadow-xl hover:shadow-brand-orange/20 disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      {status === 'sending' ? (
                        <>
                          <LoaderCircle aria-hidden="true" className="h-5 w-5 animate-spin" />
                          <span>Sending…</span>
                        </>
                      ) : (
                        <>
                          <span>Contact us</span>
                          <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="mt-6 text-center text-xs leading-relaxed text-gray-600">
                    By continuing you agree to be contacted by Voguestock. Investments are subject to market risks.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
