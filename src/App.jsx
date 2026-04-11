import { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  Check,
  Sparkles,
  ShieldCheck,
  Clock3,
  Star,
  Home,
  Building2,
  Phone,
  Mail,
  MapPin,
} from 'lucide-react';

export default function HoustonLuxeCleaningWebsite() {
  const logoPath = '/logo.png';
  const GOOGLE_SHEETS_WEBHOOK_URL =
    'https://script.google.com/macros/s/AKfycbzBG8ApDnzlTuDTi81QnMLFu_TgBSEiXm_UPlH2cNid2mwi13mamhiquPl_IAqwseV86g/exec';

  const serviceOptions = [
    {
      id: 'standard-apt-1-1',
      category: 'Standard Cleaning',
      homeType: 'Apartment',
      label: 'Apartment · 1 Bed / 1 Bath',
      price: 159,
      checkoutUrl: 'PASTE_STANDARD_APT_1_1_LINK',
    },
    {
      id: 'standard-apt-2-2',
      category: 'Standard Cleaning',
      homeType: 'Apartment',
      label: 'Apartment · 2 Bed / 2 Bath',
      price: 199,
      checkoutUrl: 'PASTE_STANDARD_APT_2_2_LINK',
    },
    {
      id: 'standard-apt-3-3',
      category: 'Standard Cleaning',
      homeType: 'Apartment',
      label: 'Apartment · 3 Bed / 3 Bath',
      price: 239,
      checkoutUrl: 'PASTE_STANDARD_APT_3_3_LINK',
    },
    {
      id: 'standard-house-3-25',
      category: 'Standard Cleaning',
      homeType: 'House',
      label: 'House · 3 Bed / 2.5 Bath',
      price: 329,
      checkoutUrl: 'PASTE_STANDARD_HOUSE_3_25_LINK',
    },
    {
      id: 'standard-house-4-3',
      category: 'Standard Cleaning',
      homeType: 'House',
      label: 'House · 4 Bed / 3 Bath',
      price: 379,
      checkoutUrl: 'PASTE_STANDARD_HOUSE_4_3_LINK',
    },
    {
      id: 'standard-house-5-35',
      category: 'Standard Cleaning',
      homeType: 'House',
      label: 'House · 5 Bed / 3.5 Bath',
      price: 429,
      checkoutUrl: 'PASTE_STANDARD_HOUSE_5_35_LINK',
    },
    {
      id: 'deep-apt-1-1',
      category: 'Deep Cleaning',
      homeType: 'Apartment',
      label: 'Apartment · 1 Bed / 1 Bath',
      price: 299,
      checkoutUrl: 'PASTE_DEEP_APT_1_1_LINK',
    },
    {
      id: 'deep-apt-2-2',
      category: 'Deep Cleaning',
      homeType: 'Apartment',
      label: 'Apartment · 2 Bed / 2 Bath',
      price: 379,
      checkoutUrl: 'PASTE_DEEP_APT_2_2_LINK',
    },
    {
      id: 'deep-apt-3-3',
      category: 'Deep Cleaning',
      homeType: 'Apartment',
      label: 'Apartment · 3 Bed / 3 Bath',
      price: 459,
      checkoutUrl: 'PASTE_DEEP_APT_3_3_LINK',
    },
    {
      id: 'deep-house-3-25',
      category: 'Deep Cleaning',
      homeType: 'House',
      label: 'House · 3 Bed / 2.5 Bath',
      price: 649,
      checkoutUrl: 'PASTE_DEEP_HOUSE_3_25_LINK',
    },
    {
      id: 'deep-house-4-3',
      category: 'Deep Cleaning',
      homeType: 'House',
      label: 'House · 4 Bed / 3 Bath',
      price: 749,
      checkoutUrl: 'PASTE_DEEP_HOUSE_4_3_LINK',
    },
    {
      id: 'deep-house-5-35',
      category: 'Deep Cleaning',
      homeType: 'House',
      label: 'House · 5 Bed / 3.5 Bath',
      price: 849,
      checkoutUrl: 'PASTE_DEEP_HOUSE_5_35_LINK',
    },
    {
      id: 'move-apt-1-1',
      category: 'Move-In / Move-Out',
      homeType: 'Apartment',
      label: 'Apartment · 1 Bed / 1 Bath',
      price: 329,
      checkoutUrl: 'PASTE_MOVE_APT_1_1_LINK',
    },
    {
      id: 'move-apt-2-2',
      category: 'Move-In / Move-Out',
      homeType: 'Apartment',
      label: 'Apartment · 2 Bed / 2 Bath',
      price: 399,
      checkoutUrl: 'PASTE_MOVE_APT_2_2_LINK',
    },
    {
      id: 'move-apt-3-3',
      category: 'Move-In / Move-Out',
      homeType: 'Apartment',
      label: 'Apartment · 3 Bed / 3 Bath',
      price: 479,
      checkoutUrl: 'PASTE_MOVE_APT_3_3_LINK',
    },
    {
      id: 'move-house-3-25',
      category: 'Move-In / Move-Out',
      homeType: 'House',
      label: 'House · 3 Bed / 2.5 Bath',
      price: 699,
      checkoutUrl: 'PASTE_MOVE_HOUSE_3_25_LINK',
    },
    {
      id: 'move-house-4-3',
      category: 'Move-In / Move-Out',
      homeType: 'House',
      label: 'House · 4 Bed / 3 Bath',
      price: 799,
      checkoutUrl: 'PASTE_MOVE_HOUSE_4_3_LINK',
    },
    {
      id: 'move-house-5-35',
      category: 'Move-In / Move-Out',
      homeType: 'House',
      label: 'House · 5 Bed / 3.5 Bath',
      price: 899,
      checkoutUrl: 'PASTE_MOVE_HOUSE_5_35_LINK',
    },
  ];

  const pricingSections = [
    {
      title: 'Standard Cleaning',
      subtitle: 'Routine maintenance for homes that need to stay polished.',
      badge: 'Most Popular',
      apartmentPricing: [
        '1 Bed / 1 Bath — $159',
        '2 Bed / 2 Bath — $199',
        '3 Bed / 3 Bath — $239',
      ],
      housePricing: [
        '3 Bed / 2.5 Bath — $329',
        '4 Bed / 3 Bath — $379',
        '5 Bed / 3.5 Bath — $429',
      ],
    },
    {
      title: 'Deep Cleaning',
      subtitle: 'A full reset for first-time cleans or homes needing extra attention.',
      badge: 'Detailed Clean',
      apartmentPricing: [
        '1 Bed / 1 Bath — $299',
        '2 Bed / 2 Bath — $379',
        '3 Bed / 3 Bath — $459',
      ],
      housePricing: [
        '3 Bed / 2.5 Bath — $649',
        '4 Bed / 3 Bath — $749',
        '5 Bed / 3.5 Bath — $849',
      ],
    },
    {
      title: 'Move-In / Move-Out',
      subtitle: 'Top-to-bottom turnover cleaning for empty properties and transitions.',
      badge: 'Turnover Ready',
      apartmentPricing: [
        '1 Bed / 1 Bath — $329',
        '2 Bed / 2 Bath — $399',
        '3 Bed / 3 Bath — $479',
      ],
      housePricing: [
        '3 Bed / 2.5 Bath — $699',
        '4 Bed / 3 Bath — $799',
        '5 Bed / 3.5 Bath — $899',
      ],
    },
  ];

  const includedSections = [
    {
      title: 'Standard Cleaning',
      items: [
        'Dusting accessible surfaces',
        'Vacuuming carpets and rugs',
        'Sweeping and mopping floors',
        'Bathroom wipe-down and sanitizing',
        'Kitchen counters, sink, and exterior appliances',
        'Trash removal and final tidy',
      ],
    },
    {
      title: 'Deep Cleaning',
      items: [
        'Everything in standard cleaning',
        'Baseboards, doors, and trim wiped down',
        'Detailed bathroom scrubbing',
        'Light buildup and neglected areas addressed',
        'Interior cabinet wipe-down',
        'Switches, vents, and high-touch areas cleaned',
      ],
    },
    {
      title: 'Move-In / Move-Out',
      items: [
        'Full empty-home deep clean',
        'Inside cabinets and drawers',
        'Inside appliances where accessible',
        'Closets, trim, baseboards, and doors',
        'Ready for showings, new tenants, or move-in day',
      ],
    },
  ];

  const steps = [
    {
      title: 'Choose Your Cleaning',
      desc: 'Select the service type that matches your space and level of detail needed.',
    },
    {
      title: 'Pick Your Date & Time',
      desc: 'Reserve a slot in seconds with our streamlined online booking form.',
    },
    {
      title: 'Complete Secure Checkout',
      desc: 'Your request is saved instantly and payment is handled through Stripe.',
    },
  ];

  const reviews = [
    {
      name: 'Danielle R.',
      text: 'The home felt hotel-level clean. Booking was fast and communication was smooth the whole way through.',
    },
    {
      name: 'Marcus T.',
      text: 'This felt much more premium than the usual cleaning companies. Worth it.',
    },
    {
      name: 'Jasmine L.',
      text: 'Perfect for Airbnb turnovers. Reliable, polished, and easy to book online.',
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
  const [showCancelled, setShowCancelled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('booking') === 'success') setShowSuccess(true);
    if (params.get('booking') === 'cancelled') setShowCancelled(true);
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

  const groupedServiceOptions = useMemo(() => {
    return serviceOptions.reduce((acc, option) => {
      if (!acc[option.category]) acc[option.category] = [];
      acc[option.category].push(option);
      return acc;
    }, {});
  }, []);

  const validateForm = () => {
    if (!fullName || !phoneNumber || !emailAddress || !serviceAddress || !selectedDate || !selectedTime) {
      return 'Please complete your contact details, address, date, and time before checkout.';
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.trim());
    if (!emailValid) return 'Please enter a valid email address.';

    const digitsOnlyPhone = phoneNumber.replace(/\D/g, '');
    if (digitsOnlyPhone.length < 10) return 'Please enter a valid phone number.';

    return '';
  };

  const handleCheckout = async () => {
    const formError = validateForm();
    if (formError) {
      setValidationMessage(formError);
      return;
    }

    if (
      !GOOGLE_SHEETS_WEBHOOK_URL ||
      GOOGLE_SHEETS_WEBHOOK_URL.includes('PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE')
    ) {
      setValidationMessage('Add your Google Sheets webhook URL before using checkout.');
      return;
    }

    setValidationMessage('');
    setIsSubmitting(true);

    try {
      const bookingPayload = {
        fullName,
        phoneNumber,
        emailAddress,
        serviceAddress,
        serviceId: selectedServiceDetails.id,
        serviceCategory: selectedServiceDetails.category,
        homeType: selectedServiceDetails.homeType,
        service: selectedServiceDetails.label,
        amount: selectedServiceDetails.price,
        date: selectedDate,
        time: selectedTime,
        notes,
        smsUpdates,
        emailUpdates,
        paymentStatus: 'Pending',
        createdAt: new Date().toISOString(),
      };

      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(bookingPayload),
      });

      if (
        selectedServiceDetails?.checkoutUrl &&
        !selectedServiceDetails.checkoutUrl.includes('PASTE_') &&
        typeof window !== 'undefined'
      ) {
        const checkoutUrl = new URL(selectedServiceDetails.checkoutUrl);
        const successUrl = `${window.location.origin}${window.location.pathname}?booking=success`;
        const cancelUrl = `${window.location.origin}${window.location.pathname}?booking=cancelled`;

        checkoutUrl.searchParams.set('prefilled_email', emailAddress);
        checkoutUrl.searchParams.set('success_url', successUrl);
        checkoutUrl.searchParams.set('cancel_url', cancelUrl);

        window.location.href = checkoutUrl.toString();
        return;
      }

      setValidationMessage('Add the Stripe checkout link for this service before going live.');
    } catch (error) {
      setValidationMessage('Booking could not be saved right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <section className="border-b border-amber-300/15 bg-gradient-to-r from-amber-300/10 via-transparent to-amber-300/5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-6 py-3 text-center text-sm text-amber-100 md:px-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-black/20 px-3 py-1">
            <Sparkles className="h-4 w-4" /> Same-week cleaning available
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-black/20 px-3 py-1">
            <ShieldCheck className="h-4 w-4" /> Secure online checkout
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-black/20 px-3 py-1">
            <Clock3 className="h-4 w-4" /> Book in under 60 seconds
          </span>
        </div>
      </section>

      {(showSuccess || showCancelled) && (
        <section
          className={`border-b ${
            showSuccess ? 'border-emerald-400/20 bg-emerald-400/10' : 'border-amber-300/20 bg-amber-300/10'
          }`}
        >
          <div className="mx-auto max-w-7xl px-6 py-4 md:px-10">
            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
              {showSuccess ? (
                <>
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">Booking Confirmed</p>
                  <h2 className="mt-1 text-2xl font-semibold">Your cleaning request has been received.</h2>
                  <p className="mt-2 text-sm text-neutral-200">
                    We’ll follow up with your confirmation details after checkout is completed.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-100">Checkout Not Completed</p>
                  <h2 className="mt-1 text-2xl font-semibold">Your slot was not reserved yet.</h2>
                  <p className="mt-2 text-sm text-neutral-200">
                    Your details are still here. You can review your service and complete checkout when ready.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_25%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-amber-200">
                <Star className="h-4 w-4" /> Houston Luxe Cleaning
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-emerald-200">
                <Check className="h-4 w-4" /> 100% Satisfaction Guarantee
              </div>
            </div>

              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl">
                Premium home cleaning without the back-and-forth.
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-300 md:text-lg">
                Book trusted residential cleaning online in minutes. Clean pricing, a polished experience, and a luxury finish every time.
              </p>

              <div className="mt-6 max-w-md">
                <img src={logoPath} alt="Houston Luxe Cleaning logo" className="h-auto w-full object-contain" />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#booking"
                  className="rounded-2xl bg-amber-300 px-6 py-3 text-sm font-semibold text-black shadow-lg transition hover:scale-[1.02]"
                >
                  Book Now
                </a>
                <a
                  href="#pricing"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  View Pricing
                </a>
              </div>

              <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="text-2xl font-semibold text-white">Fast</div>
                  <p className="mt-2 text-sm text-neutral-300">Instant online booking with no quote request required.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="text-2xl font-semibold text-white">Premium</div>
                  <p className="mt-2 text-sm text-neutral-300">Designed for clients who want more than a basic clean.</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                  <div className="text-2xl font-semibold text-white">Simple</div>
                  <p className="mt-2 text-sm text-neutral-300">Choose your service, pick a slot, and checkout securely.</p>
                </div>
              </div>
            </div>

            <div id="booking" className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-amber-200">Instant Booking</p>
                  <h2 className="mt-1 text-2xl font-semibold">Reserve Your Cleaning</h2>
                  <p className="mt-2 text-sm text-neutral-400">No calls. No waiting. Book online in under a minute.</p>
                </div>
                <div className="rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-200">
                  Stripe Ready
                </div>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="relative">
                    <input
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pl-11 outline-none placeholder:text-neutral-500"
                      placeholder="Full name"
                    />
                    <Home className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  </div>
                  <div className="relative">
                    <input
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pl-11 outline-none placeholder:text-neutral-500"
                      placeholder="Phone number"
                    />
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                  </div>
                </div>

                <div className="relative">
                  <input
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pl-11 outline-none placeholder:text-neutral-500"
                    placeholder="Email address"
                  />
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                </div>

                <div className="relative">
                  <input
                    value={serviceAddress}
                    onChange={(e) => setServiceAddress(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pl-11 outline-none placeholder:text-neutral-500"
                    placeholder="Service address"
                  />
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                </div>

                <div className="relative">
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full appearance-none rounded-2xl border border-white/10 bg-black/30 px-4 py-3 pr-12 text-neutral-200 outline-none"
                  >
                    {Object.entries(groupedServiceOptions).map(([category, options]) => (
                      <optgroup key={category} label={category}>
                        {options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.label} (${option.price})
                          </option>
                        ))}
                      </optgroup>
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
                  placeholder="Add any notes about access, parking, pets, or areas needing extra attention"
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
                  <div className="mt-2 text-lg font-semibold text-white">{selectedServiceDetails.category}</div>
                  <div className="mt-1 text-sm text-neutral-200">{selectedServiceDetails.label}</div>
                  <div className="mt-3 text-3xl font-semibold text-amber-200">${selectedServiceDetails.price}</div>
                  <p className="mt-2 text-sm text-neutral-300">
                    Review your details, then continue to secure checkout.
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
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-amber-300 px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? 'Saving Booking...' : `Continue to Checkout — $${selectedServiceDetails.price}`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-amber-200">Pricing</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Transparent pricing built for fast booking</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-neutral-400">
            Clear packages for apartments, houses, and turnover cleans. No waiting around for a quote just to get started.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingSections.map((section) => (
            <div key={section.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-lg">
              <div className="inline-flex rounded-full border border-amber-300/20 bg-amber-300/10 px-3 py-1 text-xs text-amber-200">
                {section.badge}
              </div>
              <h3 className="mt-4 text-2xl font-semibold">{section.title}</h3>
              <p className="mt-3 text-sm leading-6 text-neutral-300">{section.subtitle}</p>

              <div className="mt-6 space-y-5">
                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                    <Building2 className="h-4 w-4 text-amber-200" /> Apartments
                  </div>
                  <div className="space-y-2">
                    {section.apartmentPricing.map((line) => (
                      <div key={line} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-white">
                    <Home className="h-4 w-4 text-amber-200" /> Houses
                  </div>
                  <div className="space-y-2">
                    {section.housePricing.map((line) => (
                      <div key={line} className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-200">What’s Included</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">A cleaner experience, start to finish</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {includedSections.map((section) => (
              <div key={section.title} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <h3 className="mb-4 text-lg font-semibold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-neutral-300">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-amber-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="rounded-[2rem] border border-amber-300/20 bg-amber-300/10 p-8 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-amber-200">Our Guarantee</p>
          <h2 className="mt-2 text-3xl font-semibold md:text-4xl">If it’s not right, we fix it.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-300">
            If you're not satisfied with your cleaning, let us know within 24 hours and we’ll come back and make it right at no additional cost.
            No hassle. No stress. Just a clean you can trust.
          </p>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/5">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10">
          <div className="mb-10 text-center">
            <p className="text-sm uppercase tracking-[0.2em] text-amber-200">How It Works</p>
            <h2 className="mt-2 text-3xl font-semibold md:text-4xl">Simple, premium, and easy to book</h2>
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
