import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Linkedin, Instagram } from 'lucide-react';
import bannerImg from '../../imports/Background_design__3_-1.png';

const CONTACT_EMAIL = 'apc.nanocenter@gmail.com';

// Keeps the mailto URL inside the length mail clients accept.
const MESSAGE_LIMIT = 1200;

const inquiryTypes = [
  'General Inquiry',
  'Research Collaboration',
  'Partnership Proposal',
  'Media & Press',
  'Student / Joining the Lab',
  'Technical Support',
  'Other',
];

const emptyForm = { name: '', email: '', institution: '', type: '', message: '' };

export function ContactPage() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<'editing' | 'handedOff'>('editing');

  // This site has no backend, so the visitor mail client sends the message.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = [
      'Name: ' + form.name,
      'Email: ' + form.email,
      'Institution: ' + (form.institution || '-'),
      'Inquiry type: ' + form.type,
      '',
      form.message,
    ].join('\n');

    const subject = encodeURIComponent('[Website] ' + form.type);

    window.location.href =
      'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + encodeURIComponent(body);

    setStatus('handedOff');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFE]">
      {/* Header */}
      <div
        className="relative py-20 px-4 overflow-hidden"
        style={{ backgroundImage: `url(${bannerImg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        <div className="absolute inset-0 bg-[#1E3A5F]/60" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-[#2D9CDB] font-semibold tracking-widest text-sm uppercase mb-3">Get in Touch</p>
          <h1 className="text-white mb-4">Contact APC Research</h1>
          <p className="text-blue-200 max-w-2xl mx-auto leading-relaxed">
            Collaborations, lab visits and student applications all start here.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <h3 className="text-[#1E3A5F] font-bold mb-5">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2D9CDB]/10 flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-[#2D9CDB]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Email</p>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#1E3A5F] font-medium text-sm hover:text-[#2D9CDB] transition-colors">{CONTACT_EMAIL}</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2D9CDB]/10 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-[#2D9CDB]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Phone</p>
                    <a href="tel:+622175791652" className="text-[#1E3A5F] font-medium text-sm hover:text-[#2D9CDB] transition-colors">+62 21 7579 1652</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#2D9CDB]/10 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-[#2D9CDB]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">Address</p>
                    <p className="text-[#1E3A5F] font-medium text-sm leading-relaxed">
                      Gd. Nanoplex, Jl. Raya Puspiptek A12<br />
                      Tangerang Selatan, Banten 15314<br />
                      Indonesia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <h3 className="text-[#1E3A5F] font-bold mb-4">Office Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Monday to Friday</span>
                  <span className="text-[#1E3A5F] font-medium">08:00 to 17:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Saturday</span>
                  <span className="text-[#1E3A5F] font-medium">09:00 to 13:00 WIB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sunday</span>
                  <span className="text-gray-400">Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
              <h3 className="text-[#1E3A5F] font-bold mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/nano-center-indonesia' },
                  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/apc.nanocenter/' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#F0F6FF] text-[#1E3A5F] rounded-lg text-sm font-medium hover:bg-[#2D9CDB] hover:text-white transition-colors"
                  >
                    <Icon size={15} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              {status === 'handedOff' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-[#1E3A5F] font-bold text-xl mb-2">Your draft is ready</h3>
                  <p className="text-gray-600 max-w-sm">
                    Your mail app just opened with this message addressed to{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#2D9CDB] hover:underline">{CONTACT_EMAIL}</a>.
                    Press send there and we reply within 2 to 3 business days.
                  </p>
                  <p className="text-gray-500 text-sm mt-3 max-w-sm">
                    Nothing opened? Write to{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#2D9CDB] hover:underline">{CONTACT_EMAIL}</a>{' '}
                    directly.
                  </p>
                  <button
                    onClick={() => { setStatus('editing'); setForm(emptyForm); }}
                    className="mt-6 px-6 py-2.5 bg-[#2D9CDB] text-white rounded-full text-sm font-semibold hover:bg-[#1E3A5F] transition-colors"
                  >
                    Write Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-[#1E3A5F] font-bold text-xl mb-6">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-semibold text-[#1E3A5F] uppercase tracking-wide mb-1.5">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          autoComplete="name"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#1E3A5F] placeholder-gray-400 focus:outline-none focus:border-[#2D9CDB] focus:ring-1 focus:ring-[#2D9CDB] transition"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#1E3A5F] uppercase tracking-wide mb-1.5">Email *</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@example.com"
                          autoComplete="email"
                          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#1E3A5F] placeholder-gray-400 focus:outline-none focus:border-[#2D9CDB] focus:ring-1 focus:ring-[#2D9CDB] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E3A5F] uppercase tracking-wide mb-1.5">Institution / Organization</label>
                      <input
                        type="text"
                        value={form.institution}
                        onChange={(e) => setForm({ ...form, institution: e.target.value })}
                        placeholder="Your university or company"
                        autoComplete="organization"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#1E3A5F] placeholder-gray-400 focus:outline-none focus:border-[#2D9CDB] focus:ring-1 focus:ring-[#2D9CDB] transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E3A5F] uppercase tracking-wide mb-1.5">Inquiry Type *</label>
                      <select
                        required
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#1E3A5F] focus:outline-none focus:border-[#2D9CDB] focus:ring-1 focus:ring-[#2D9CDB] transition bg-white"
                      >
                        <option value="">Select a topic</option>
                        {inquiryTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#1E3A5F] uppercase tracking-wide mb-1.5">Message *</label>
                      <textarea
                        required
                        rows={5}
                        maxLength={MESSAGE_LIMIT}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="What would you like to discuss?"
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-[#1E3A5F] placeholder-gray-400 focus:outline-none focus:border-[#2D9CDB] focus:ring-1 focus:ring-[#2D9CDB] transition resize-none"
                      />
                      <p className="mt-1.5 text-xs text-gray-400 text-right">
                        {form.message.length} / {MESSAGE_LIMIT}
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 w-full py-3 bg-[#1E3A5F] text-white rounded-full font-semibold hover:bg-[#2D9CDB] transition-colors"
                    >
                      Open in Mail App <Send size={15} />
                    </button>

                    <p className="text-xs text-gray-400 text-center">
                      This opens a prefilled draft in your own mail app.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#F0F6FF] h-56 flex items-center justify-center">
            <div className="text-center">
              <MapPin size={36} className="text-[#2D9CDB] mx-auto mb-2" />
              <p className="text-[#1E3A5F] font-semibold">Nano Center Indonesia</p>
              <p className="text-gray-500 text-sm">Jl. Raya Puspiptek A12, Tangerang Selatan</p>
              <a
                href="https://maps.google.com/?q=Nano+Center+Indonesia+Puspiptek+Tangerang"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 px-4 py-1.5 bg-[#2D9CDB] text-white text-xs rounded-full hover:bg-[#1E3A5F] transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
