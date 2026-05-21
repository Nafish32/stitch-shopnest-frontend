import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-16 bg-navy-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-heading font-bold text-amber-brand">Get to Know Us</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li><Link to="/account">About Us</Link></li>
            <li><Link to="/account">Careers</Link></li>
            <li><Link to="/account">Press</Link></li>
            <li><Link to="/account">Investor Relations</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading font-bold text-amber-brand">Shop with Confidence</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>Cash on Delivery</li>
            <li>Gift-ready packaging</li>
            <li>Verified sellers</li>
            <li>Secure account access</li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading font-bold text-amber-brand">Customer Service</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>Help Center</li>
            <li>Returns & Replacements</li>
            <li>Shipping Rates</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div>
          <h3 className="font-heading font-bold text-amber-brand">Sell with ShopNest</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-200">
            <li>Sell on ShopNest</li>
            <li>Fulfillment by ShopNest</li>
            <li>Seller Help</li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-white/10 px-4 py-6 text-right text-sm text-slate-300">
        Copyright © 2026 ShopNest, Inc.
      </div>
    </footer>
  );
}
