import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import getStripe from '@/utils/stripe'
import { getOrganization, getProfile } from '@/lib/auth'
import { PersonalDetailsCard } from '@/components/cards/personal-details-card'
import { OrganizationDetailsCard } from '@/components/cards/organization-details-card'
import { BillingDetailsCard } from '@/components/cards/billing-details-card'
import { AIPreferencesCard } from '@/components/cards/ai-preferences-card'
import { IntegrationsCard } from '@/components/cards/integrations-card'
import { ThemeSelectionCard } from '@/components/cards/theme-selection-card'
import styles from './settings.module.css'
import { AccountActionsCard } from '@/components/cards/account-actions-card'

export default async function TeamPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/')

  const { data: getUserIdentitiesData } =
    await supabase.auth.getUserIdentities()

  // const userRole = await getUserRole()

  // const organizationMembers = await getOrganizationMembers()

  const profile = await getProfile()

  if (!profile) redirect('/')

  const organization = await getOrganization()

  if (!organization) redirect('/')

  // const { data: teams } = await supabase
  //   .from('teams')
  //   .select('*, members:profiles!teams_members(*)')
  //   .eq('organization', organization.id)

  const stripe = getStripe()

  // const stripeCustomer = await getCustomer()

  const {
    data: [stripePaymentMethod],
  } = await stripe.customers.listPaymentMethods(
    organization.stripe_customer_id!,
    {
      limit: 1,
    },
  )

  return (
    <div className={styles.main}>
      <div>
        <PersonalDetailsCard
          profile={profile}
          userIdentities={getUserIdentitiesData?.identities}
        />
        <OrganizationDetailsCard organization={organization} />
        <BillingDetailsCard card={stripePaymentMethod?.card ?? null} />
        <AccountActionsCard />
      </div>
      <div>
        <ThemeSelectionCard theme={profile.theme} />
        <AIPreferencesCard />
        <IntegrationsCard />
      </div>
    </div>
    // <div className="gap-x-8 gap-y-24 grid sm:grid-cols-2 max-w-screen-md px-8 py-24 w-full">
    //   <section className="col-span-full flex flex-col gap-4 items-center">
    //     <div className="bg-orange-300 rounded-full size-32" />
    //     {/* <Image
    //         alt="Avatar"
    //         className="rounded-full"
    //         height={128}
    //         // src={organization.logo_url}
    //         width={128}
    //       /> */}
    //     <h5 className="font-bold text-3xl">{organization.name}</h5>
    //   </section>
    //   <section className="space-y-4">
    //     <header className="flex gap-8 items-center justify-between">
    //       <h5 className="font-bold text-xl">Personal Details</h5>
    //       <Dialog>
    //         <DialogTrigger asChild>
    //           <button className="font-bold hover:underline">Edit</button>
    //         </DialogTrigger>
    //         <UpdateProfileDialogContent />
    //       </Dialog>
    //     </header>
    //     <div className="gap-x-4 gap-y-2 grid grid-cols-[151px_1fr]">
    //       <p className="font-bold">Name</p>
    //       <p className="text-right">{profile.full_name}</p>
    //       <p className="font-bold">Email</p>
    //       <p className="text-right">{profile.email}</p>
    //     </div>
    //   </section>
    //   <section className="space-y-4">
    //     <header className="flex gap-8 items-center justify-between">
    //       <h5 className="font-bold text-xl">Organization Details</h5>
    //       <Dialog>
    //         <DialogTrigger asChild>
    //           <button className="font-bold hover:underline">Edit</button>
    //         </DialogTrigger>
    //         <UpdateOrganizationDialogContent />
    //       </Dialog>
    //     </header>
    //     <div className="gap-x-4 gap-y-2 grid grid-cols-[151px_1fr]">
    //       <p className="font-bold">Name</p>
    //       <p className="text-right">{organization.name}</p>
    //     </div>
    //   </section>
    //   {userRole === 'admin' && (
    //     <>
    //       <section className="space-y-4">
    //         <header className="flex gap-8 items-center justify-between">
    //           <h5 className="font-bold text-xl">Billing Period Usage</h5>
    //         </header>
    //         <div className="gap-x-4 gap-y-2 grid grid-cols-[151px_1fr]">
    //           <p className="font-bold">Feedback sent</p>
    //           <p className="text-right">0</p>
    //           <p className="font-bold">Cost</p>
    //           <p className="text-right">€{(0 * 0.1).toFixed(2)}</p>
    //         </div>
    //       </section>
    //       <section className="space-y-4">
    //         <header className="flex gap-8 items-center justify-between">
    //           <h5 className="font-bold text-xl">Billing</h5>
    //           <Dialog>
    //             <DialogTrigger asChild>
    //               <button className="font-bold hover:underline">Edit</button>
    //             </DialogTrigger>
    //             <UpdateBillingDialogContent />
    //           </Dialog>
    //         </header>
    //         <div className="gap-x-4 gap-y-2 grid grid-cols-[151px_1fr]">
    //           <p className="font-bold">Address</p>
    //           <ul className="text-right">
    //             {stripeCustomer?.address && (
    //               <>
    //                 <p>{stripeCustomer.address.line1}</p>
    //                 <p>{stripeCustomer.address.line2}</p>
    //                 <p>{stripeCustomer.address.city}</p>
    //                 <p>{stripeCustomer.address.postal_code}</p>
    //                 <p>{stripeCustomer.address.country}</p>
    //               </>
    //             )}
    //           </ul>
    //           <p className="font-bold">Payment method</p>
    //           <p className="text-right">{stripePaymentMethod?.card?.last4}</p>
    //         </div>
    //       </section>
    //       <section className="space-y-4">
    //         <header className="flex items-end justify-between">
    //           <h5 className="font-bold text-xl">People</h5>
    //           <Dialog>
    //             <DialogTrigger asChild>
    //               <button className="font-bold hover:underline">Invite</button>
    //             </DialogTrigger>
    //             <InvitePersonDialogContent />
    //           </Dialog>
    //         </header>
    //         <ul className="gap-x-4 gap-y-2 grid grid-cols-[151px_1fr]">
    //           {organizationMembers.map(({ profile }) => (
    //             <li
    //               className="col-span-full flex gap-4 items-center"
    //               key={profile.id}
    //             >
    //               <Avatar profile={profile} />
    //               <div className="flex flex-col h-full justify-evenly">
    //                 <p className="font-bold leading-none whitespace-nowrap">
    //                   {profile.full_name}
    //                 </p>
    //                 <a
    //                   className="hover:underline leading-none opacity-80 text-sm whitespace-nowrap"
    //                   href={`mailto:${profile.email}`}
    //                 >
    //                   {profile.email}
    //                 </a>
    //               </div>
    //               <span className="capitalize grow opacity-80 text-right text-sm">
    //                 {profile.profiles_roles[0].role}
    //               </span>
    //             </li>
    //           ))}
    //         </ul>
    //       </section>
    //       <section className="space-y-4">
    //         <header className="flex gap-8 items-end justify-between">
    //           <h5 className="font-bold text-xl">Teams</h5>
    //           <Dialog>
    //             <DialogTrigger asChild>
    //               <button className="font-bold hover:underline">Create</button>
    //             </DialogTrigger>
    //             <CreateTeamDialogContent />
    //           </Dialog>
    //         </header>
    //         <ul className="gap-x-4 gap-y-2 grid grid-cols-[151px_1fr]">
    //           {teams?.map(team => (
    //             <li
    //               className="col-span-full grid grid-cols-subgrid items-center"
    //               key={team.id}
    //             >
    //               <span className="font-bold leading-none whitespace-nowrap">
    //                 {team.name}
    //               </span>
    //               <ul className="flex justify-end -space-x-5">
    //                 {team.members.map((member, index) => (
    //                   <Avatar
    //                     key={member.id}
    //                     profile={member}
    //                     style={{ zIndex: team.members.length - index }}
    //                   />
    //                 ))}
    //               </ul>
    //             </li>
    //           ))}
    //         </ul>
    //       </section>
    //     </>
    //   )}
    //   <form action={signOut}>
    //     <Button>Sign out</Button>
    //   </form>
    // </div>
  )
}
