'use client';

import AppLayout from './AppLayout';
import PageHeader from '../../app/PageHeader';
import SettingsSection from '../../app/SettingsSection';
import SwitchRow from '../../app/SwitchRow';
import TeamMembers from '../../app/TeamMembers';
import PlanUsageCard from '../../app/PlanUsageCard';
import AnimatedInput from '../../forms/AnimatedInput';
import ModernSelect from '../../forms/ModernSelect';
import { lobbyData, saasRoutes, type LobbyData, type SaasRoutes } from './data';
import './SettingsPage.css';

/**
 * SettingsPage — Account & workspace settings: profile, property details, notification switches,
 * team management with roles and invites, and plan usage / billing.
 *
 * Usage (src/pages/app/settings.astro):
 *   import { SettingsPage } from 'astro-component-kit/templates/saas-hotel';
 *   <SettingsPage />
 *
 * @param {LobbyData} data - Workspace data.
 * @param {SaasRoutes} routes - Page URLs.
 * @param {string} theme - Initial theme (light|dark|auto). Default 'light'.
 */
export interface SettingsPageProps {
  data?: LobbyData;
  routes?: SaasRoutes;
  theme?: 'light' | 'dark' | 'auto';
}

export function SettingsPage({ data = lobbyData, routes = saasRoutes, theme = 'light' }: SettingsPageProps) {
  return (
    <>
      <AppLayout title="Settings" current="settings" data={data} routes={routes} theme={theme}>
        <PageHeader title="Settings" description="Manage your profile, property, team and billing." breadcrumb={[{ label: data.workspace.name, href: routes.dashboard }, { label: 'Settings' }]} actions={[]} periods={[]} tabs={[
            { label: 'Profile', href: '#profile' },
            { label: 'Property', href: '#property' },
            { label: 'Notifications', href: '#notifications' },
            { label: 'Team', href: '#team', count: data.team.length },
            { label: 'Billing', href: '#billing' },
          ]} currentTab="#profile" />
      
        <div className="settings" data-rk-882bc7="">
          <div id="profile" data-rk-882bc7="">
            <SettingsSection id="set-profile" title="Your profile" description="How you appear to your team and in guest messages.">
              <div className="settings__row" data-rk-882bc7="">
                <AnimatedInput label="Full name" id="set-name" name="name" required autocomplete="name" placeholder=" " />
                <AnimatedInput label="Email" id="set-email" name="email" type="email" required autocomplete="email" />
              </div>
              <div className="settings__row" data-rk-882bc7="">
                <AnimatedInput label="Job title" id="set-role" name="role" autocomplete="organization-title" />
                <ModernSelect label="Language" id="set-lang" name="lang" options={[{ label: 'English', value: 'en' }, { label: 'Español', value: 'es' }, { label: 'Русский', value: 'ru' }]} />
              </div>
            </SettingsSection>
          </div>
      
          <div id="property" data-rk-882bc7="">
            <SettingsSection id="set-property" title="Property" description="Details used on invoices, confirmations and your booking engine.">
              <div className="settings__row" data-rk-882bc7="">
                <AnimatedInput label="Property name" id="set-prop" name="property" required />
                <ModernSelect label="Currency" id="set-cur" name="currency" options={[{ label: 'Euro (€)', value: 'EUR' }, { label: 'US dollar ($)', value: 'USD' }, { label: 'Pound (£)', value: 'GBP' }]} />
              </div>
              <div className="settings__row" data-rk-882bc7="">
                <ModernSelect label="Check-in time" id="set-in" name="checkin" options={[{ label: '14:00', value: '14' }, { label: '15:00', value: '15' }, { label: '16:00', value: '16' }]} />
                <ModernSelect label="Check-out time" id="set-out" name="checkout" options={[{ label: '11:00', value: '11' }, { label: '12:00', value: '12' }]} />
              </div>
            </SettingsSection>
          </div>
      
          <div id="notifications" data-rk-882bc7="">
            <SettingsSection id="set-notes" title="Notifications" description="Choose what reaches your inbox and phone.">
              <SwitchRow name="n-bookings" label="New bookings & cancellations" description="Instant email for every change from any channel." checked />
              <SwitchRow name="n-house" label="Housekeeping alerts" description="Push notification when a room is out of order." checked />
              <SwitchRow name="n-reviews" label="New guest reviews" description="Daily digest at 9:00." checked={false} />
              <SwitchRow name="n-report" label="Weekly performance report" description="Occupancy, ADR and RevPAR every Monday." checked />
            </SettingsSection>
          </div>
      
          <div id="team" className="settings__block" data-rk-882bc7="">
            <div className="settings__intro" data-rk-882bc7="">
              <h2 data-rk-882bc7="">Team</h2>
              <p data-rk-882bc7="">Invite colleagues and choose what each role can see and do.</p>
            </div>
            <TeamMembers members={data.team} seats={10} />
          </div>
      
          <div id="billing" className="settings__block" data-rk-882bc7="">
            <div className="settings__intro" data-rk-882bc7="">
              <h2 data-rk-882bc7="">Plan & billing</h2>
              <p data-rk-882bc7="">Your subscription renews automatically. Change or cancel any time.</p>
            </div>
            <PlanUsageCard variant="accent" upgrade={{ label: 'Upgrade to Business', href: routes.landing + '#pricing' }} />
          </div>
        </div>
      </AppLayout>
    </>
  );
}

export default SettingsPage;
