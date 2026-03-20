import { useEffect, useMemo, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function HoustonLuxeCleaningWebsite() {
  const logoPath = '/logo.png';

  const serviceOptions = [
    { id: 'regular-1', label: 'Regular Clean - Studio / 1 Bed', price: 110, checkoutUrl: 'https://buy.stripe.com/replace_regular_1' },
    { id: 'regular-23', label: 'Regular Clean - 2–3 Bedroom', price: 160, checkoutUrl: 'https://buy.stripe.com/replace_regular_23' },
    { id: 'regular-4', label: 'Regular Clean - 4 Bedroom', price: 200, checkoutUrl: 'https://buy.stripe.com/replace_regular_4' },
    { id: 'regular-2000', label: 'Regular Clean - ~2,000 sq ft', price: 220, checkoutUrl: 'https://buy.stripe.com/replace_regular_2000' },
    { id: 'deep-1', label: 'Deep Clean - Studio / 1 Bed', price: 160, checkoutUrl: 'https://buy.stripe.com/replace_deep_1' },
    { id: 'deep-23', label: 'Deep Clean - 2–3 Bedroom', price: 220, checkoutUrl: 'https://buy.stripe.com/replace_deep_23' },
    { id: 'deep-4', label: 'Deep Clean - 4 Bedroom', price: 260, checkoutUrl: 'https://buy.stripe.com/replace_deep_4' },
    { id: 'deep-2000', label: 'Deep Clean - ~2,000 sq ft', price: 300, checkoutUrl: 'https://buy.stripe.com/replace_deep_2000' },
    { id: 'move-1', label: 'Move-In/Out - Studio / 1 Bed', price: 180, checkoutUrl: 'https://buy.stripe.com/replace_move_1' },
    { id: 'move-23', label: 'Move-In/Out - 2–3 Bedroom', price: 250, checkoutUrl: 'https://buy.stripe.com/replace_move_23' },
    { id: 'move-4', label: 'Move-In/Out - 4 Bedroom', price: 300, checkoutUrl: 'https://buy.stripe.com/replace_move_4' },
    { id: 'move-2000', label: 'Move-In/Out - ~2,000 sq ft', price: 350, checkoutUrl: 'https://buy.stripe.com/replace_move_2000' },
  ];

  const services = [
    {
      title: 'Regular Clean',
      subtitle: 'Luxury upkeep cleaning',
      tiers: [
        'Studio / 1 Bed → $110',
        '2–3 Bedroom → $160',
        '4 Bedroom → $200',
        '~2,000 sq ft → $220',
      ],
    },
    {
      title: 'Deep Clean',
      subtitle: 'Detailed, top-to-bottom reset',
      tiers: [
        'Studio / 1 Bed → $160',
        '2–3 Bedroom → $220',
        '4 Bedroom → $260',
        '~2,000 sq ft → $300',
      ],
    },
    {
      title: 'Move-In / Move-Out Clean',
      subtitle: 'Empty home, full turnover clean',
      tiers: [
        'Studio / 1 Bed → $180',
        '2–3 Bedroom → $250',
        '4 Bedroom → $300',
        '~2,000 sq ft → $350',
      ],
    },
  ];

  const steps = [
    { title: 'Choose Your Service', desc: 'Pick the cleaning package that fits your home or rental.' },
    { title: 'Book & Pay Online', desc: 'Use the booking form and Stripe checkout to reserve your slot.' },
    { title: 'We Handle the Rest', desc: 'Your assigned cleaning professional arrives ready to deliver.' },
  ];

  const reviews = [
    {
      name: 'Danielle R.',
      text: 'Super responsive, professional, and the place looked amazing after the clean.',
    },
    {
      name: 'Marcus T.',
      text: 'Exactly the kind of luxury cleaning experience I wanted. Smooth booking and great communication.',
    },
    {
      name: 'Jasmine L.',
      text: 'Perfect for Airbnb turnovers. Fast, reliable, and stress-free.',
    },
  ];

  const [selectedService, setSelectedService] = useState(serviceOptions[0].id);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [serviceAddress, setServiceAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [smsUpdates, setSmsUpdates] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [validationMessage, setValidationMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('booking') === 'success') {
      setShowSuccess(true);
    }
  }, []);

  const dateOptions = useMemo(() => {
    return Array.from({ length: 14 }, (_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      const value = date.toISOString().split('T')[0];
      const label = date.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      return { value, label };
    });
  }, []);

  const timeOptions = ['8:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM'];

  const selectedServiceDetails = useMemo(
    () => serviceOptions.find((option) => option.id === selectedService) ?? serviceOptions[0],
    [selectedService]
  );

  const handleCheckout = () => {
    if (!fullName || !phoneNumber || !emailAddress || !serviceAddress || !selectedDate || !selectedTime) {
      setValidationMessage('Please complete your contact details, address, date, and time before checkout.');
      return;
    }

    setValidationMessage('');

    if (selectedServiceDetails?.checkoutUrl && typeof window !== 'undefined') {
      const checkoutUrl = new URL(selectedServiceDetails.checkoutUrl);
      const successUrl = `${window.location.origin}${window.location.pathname}?booking=success`;
      const cancelUrl = `${window.location.origin}${window.location.pathname}?booking=cancelled`;

      checkoutUrl.searchParams.set('prefilled_email', emailAddress);
      checkoutUrl.searchParams.set('client_reference_id', selectedServiceDetails.id);
      checkoutUrl.searchParams.set('success_url', successUrl);
      checkoutUrl.searchParams.set('cancel_url', cancelUrl);
      checkoutUrl.searchParams.set('full_name', fullName);
      checkoutUrl.searchParams.set('phone', phoneNumber);
      checkoutUrl.searchParams.set('address', serviceAddress);
      checkoutUrl.searchParams.set('service_date', selectedDate);
      checkoutUrl.searchParams.set('service_time', selectedTime);
      checkoutUrl.searchParams.set('notes', notes);
      checkoutUrl.searchParams.set('sms_updates', String(smsUpdates));
      checkoutUrl.searchParams.set('email_updates', String(emailUpdates));

      window.location.href = checkoutUrl.toString();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {showSuccess && (
        <section className="border-b border-emerald-400/20 bg-emerald-400/10">
          <div className="mx-auto max-w-7xl px-6 py-4 md:px-10">
            <div className="flex flex-col gap-2 rounded-[1.5rem] border border-emerald-300/20 bg-black/20 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Booking Confirmed</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">Your cleaning request has been received.</h2>
                <p className="mt-2 text-sm text-neutral-200">
                  We’ll send your confirmation details by email and text once your Stripe payment is completed and notifications are connected.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowSuccess(false)}
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-300/10 via-transparent to-white/5" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-1 text-sm text-amber-200">
                Houston’s Luxury Cleaning Experience
              </div>

              <div className="mt-4 max-w-md rounded-[2rem] border border-white/10 bg-white/5 p-4 shadow-2xl">
                <img src={logoPath} alt="Houston Luxe Cleaning logo" className="h-auto w-full object-contain" />
              </div>

              <p className="mt-5 max-w-xl text-base leading-7 text-neutral-300 md:text-lg">
                Premium residential cleaning and Airbnb turnovers with a polished, seamless booking experience.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#booking"
                  className="rounded-2xl bg-amber-300 px-6 py-3 text-sm font-semibold text-black shadow-lg transition hover:scale-[1.02]"
                >
                  Book Now
                </a>
                <a
                  href="#services"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View Services
                </a>
              </div>

              <div className="mt-8 grid max-w-lg grid-cols-3 gap-4 text-sm text-neutral-300">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xl font-semibold text-white">24h</div>
                  <div>Fast response time</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xl font-semibold text-white">5★</div>
                  <div>Luxury-level care</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-xl font-semibold text-white">Easy</div>
                  <div>Online booking</div>
                </div>
              </div>
            </div>

            <div>
             <div>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-amber-200">Instant Booking</p>
                    <h2 className="mt-1 text-2xl font-semibold">Reserve Your Clean</h2>
                  </div>
                  <div className="rounded-full bg-amber-300/10 px-3 py-1 text-xs text-amber-200">Stripe Ready</div>
                </div>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none placeholder:text-neutral-500"
                      placeholder="Full name"
                    />
                    <input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none placeholder:text-neutral-500"
                      placeholder="Phone number"
                    />
                  </div>

                  <input
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none placeholder:text-neutral-500"
                    placeholder="Email address"
                  />

                  <input
                    value={serviceAddress}
                    onChange={(e) => setServiceAddress(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none placeholder:text-neutral-500"
                    placeholder="Service address"
                  />

                  <div className="relative">
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pr-12 text-neutral-200 outline-none"
                    >
                      {serviceOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.label} (${option.price})
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="relative">
                      <select
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pr-12 text-neutral-200 outline-none"
                      >
                        <option value="">Select date</option>
                        {dateOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                    </div>

                    <div className="relative">
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pr-12 text-neutral-200 outline-none"
                      >
                        <option value="">Select time slot</option>
                        {timeOptions.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
                    </div>
                  </div>

                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[110px] w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 outline-none placeholder:text-neutral-500"
                    placeholder="Bedrooms, bathrooms, square footage, or any special notes"
                  />

                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-neutral-200">
                      <input
                        type="checkbox"
                        checked={smsUpdates}
                        onChange={(e) => setSmsUpdates(e.target.checked)}
                        className="h-4 w-4 accent-amber-300"
                      />
                      Send booking updates by SMS
                    </label>
                    <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-neutral-200">
                      <input
                        type="checkbox"
                        checked={emailUpdates}
                        onChange={(e) => setEmailUpdates(e.target.checked)}
                        className="h-4 w-4 accent-amber-300"
                      />
                      Send booking updates by email
                    </label>
                  </div>

                  <div className="rounded-[1.5rem] border border-amber-300/20 bg-amber-300/10 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-amber-200">Selected Service</div>
                    <div className="mt-2 text-lg font-semibold text-white">{selectedServiceDetails.label}</div>
                    <div className="mt-1 text-3xl font-semibold text-amber-200">${selectedServiceDetails.price}</div>
                    <p className="mt-2 text-sm text-neutral-300">
                      When you add your Stripe payment links, this button will send each customer to the matching checkout page automatically.
                    </p>
                  </div>

                  {validationMessage && (
                    <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                      {validationMessage}
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleCheckout}
                    className="w-full rounded-2xl bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.01]"
                  >
                    Continue to Checkout — ${selectedServiceDetails.price}
                  </button>

                  <p className="text-center text-xs text-neutral-500">
                    Replace the placeholder Stripe links in the code with your real checkout URLs.
                  </p>

                  <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 text-sm text-neutral-300">
                    <div className="text-xs uppercase tracking-[0.2em] text-amber-200">After Payment Flow</div>
                    <p className="mt-2">
                      After Stripe payment, send customers back to this page using a success URL ending in{' '}
                      <span className="text-white">?booking=success</span>. Then connect Stripe to Zapier so you can trigger a confirmation email and SMS automatically.
                    </p>
                    <div className="mt-3 space-y-2 text-neutral-400">
                      <p>1. Stripe successful payment</p>
                      <p>2. Zapier sends booking email confirmation</p>
                      <p>3. Zapier or Twilio sends SMS confirmation</p>
                      <p>4. You create or assign the job in Jobber</p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-200">Services</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Cleaning services built to feel premium</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-neutral-400">
            Designed for busy homeowners, luxury apartments, and Houston-area Airbnb hosts who want a clean, polished finish every time.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div key={service.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-lg">
              <div className="mb-4 inline-flex rounded-full bg-amber-300/10 px-3 py-1 text-xs text-amber-200">
                Luxury Pricing
              </div>
              <h3 className="text-2xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-neutral-300">{service.subtitle}</p>
              <div className="mt-6 space-y-3">
                {service.tiers.map((tier) => (
                  <div key={tier} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white">
                    {tier}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-10 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-200">What's Included</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">What you get with every clean</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="mb-4 text-xl font-semibold">Standard / Regular Clean</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>• Dusting all surfaces</li>
              <li>• Sweeping & mopping floors</li>
              <li>• Vacuuming carpets</li>
              <li>• Cleaning bathrooms</li>
              <li>• Kitchen cleaning (exterior appliances)</li>
              <li>• Trash removal</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="mb-4 text-xl font-semibold">Deep Clean</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>• Everything in standard clean</li>
              <li>• Baseboards wiped down</li>
              <li>• Inside appliances (optional)</li>
              <li>• Detailed bathroom scrubbing</li>
              <li>• Interior cabinet wipe-down</li>
              <li>• Doors, switches, vents cleaned</li>
              <li>• Heavy buildup addressed</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <h3 className="mb-4 text-xl font-semibold">Move-In / Move-Out</h3>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>• Full deep clean of empty home</li>
              <li>• Inside cabinets & drawers</li>
              <li>• Inside appliances</li>
              <li>• Closets, baseboards, doors, trim</li>
              <li>• Ready for next tenant or owner</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-200">How It Works</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Simple, clean, and easy to book</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-[2rem] border border-white/10 bg-neutral-950 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-300 text-lg font-bold text-black">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-neutral-300">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-200">Testimonials</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Trusted by clients who want more than basic</h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <div className="mb-3 text-amber-200">★★★★★</div>
              <p className="text-neutral-300">“{review.text}”</p>
              <div className="mt-5 font-semibold">{review.name}</div>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
}
