import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Plus } from 'lucide-react'
import Avatar from '@/components/Avatar'

export default async function TeamPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: company } = await supabase
    .from('companies')
    .select('*, profiles(id)')
    .eq('profiles.id', user.id)
    .single()

  if (!company) redirect('/')

  const { data: profiles } = await supabase
    .from('profiles')
    .select('*, companies(*)')
    .eq('companies.id', company.id)
    .order('full_name')

  const { data: teams } = await supabase
    .from('teams')
    .select('*, members:profiles!teams_members(*)')
    .eq('company', company.id)

  return (
    <div className="gap-x-8 gap-y-24 grid grid-cols-2 max-w-screen-md px-8 py-24 w-full">
      <section className="col-span-full flex flex-col gap-4 items-center">
        <div className="bg-orange-300 rounded-full size-32" />
        {/* <Image
            alt="Avatar"
            className="rounded-full"
            height={128}
            // src={company.logo_url}
            width={128}
          /> */}
        <h5 className="font-bold text-3xl">{company.name}</h5>
      </section>
      <section className="col-span-full grid grid-cols-subgrid">
        <section className="space-y-4">
          <header className="flex gap-8 items-center justify-between">
            <h5 className="font-bold text-2xl">Usage</h5>
            {/* <p className="opacity-80"></p> */}
          </header>
          <div className="gap-x-4 gap-y-2 grid grid-cols-[151px_1fr]">
            <p className="font-bold">Feedback sent</p>
            <p className="text-right">85</p>
            <p className="font-bold">Monthly cost</p>
            <p className="text-right">€{(85 * 0.1).toFixed(2)}</p>
            <p className="font-bold">Spending cap</p>
            <p className="text-right">€100</p>
          </div>
        </section>
        <section className="space-y-4">
          <header className="flex gap-8 items-center justify-between">
            <h5 className="font-bold text-2xl">Billing</h5>
            {/* <p className="opacity-80"></p> */}
          </header>
          <div className="gap-x-4 gap-y-2 grid grid-cols-[151px_1fr]">
            <p className="font-bold">Address</p>
            <ul className="text-right">
              <p>64585 Santiago Pass</p>
              <p>Predovicstad</p>
              <p>Wyoming</p>
              <p>41090</p>
              <p>United States</p>
            </ul>
            <p className="font-bold">Payment method</p>
            <p className="text-right">············6190</p>
          </div>
        </section>
      </section>
      <section className="col-span-full grid grid-cols-subgrid">
        <section className="space-y-4">
          <header className="flex items-end justify-between">
            <h5 className="font-bold text-2xl">People</h5>
            <a className="font-bold hover:underline" href="">
              Invite
            </a>
          </header>
          <ul className="gap-x-4 gap-y-2 grid grid-cols-[151px_1fr]">
            {/* <li className="col-span-full cursor-pointer grid grid-cols-subgrid group items-center">
              <span className="font-bold group-hover:underline leading-none whitespace-nowrap">
                Invite person
              </span>
              <div className="bg-orange-300 flex items-center justify-center outline-2 outline-orange-200 rounded-full size-10 text-lg transition-[margin]">
                <Plus />
              </div>
            </li> */}
            {profiles?.map(profile => (
              <li
                className="col-span-full grid grid-cols-subgrid items-center"
                key={profile.id}
              >
                <span className="font-bold leading-none whitespace-nowrap">
                  {profile.full_name}
                </span>
                <ul className="flex justify-end -space-x-5">
                  <Avatar profile={profile} />
                </ul>
              </li>
            ))}
          </ul>
        </section>
        <section className="space-y-4">
          <header className="flex gap-8 items-end justify-between">
            <h5 className="font-bold text-2xl">Teams</h5>
            <a className="font-bold hover:underline" href="">
              Create
            </a>
            {/* <p className="opacity-80"></p> */}
          </header>
          <ul className="gap-x-4 gap-y-2 grid grid-cols-[151px_1fr]">
            {/* <li className="col-span-full cursor-pointer grid grid-cols-subgrid group items-center">
              <span className="font-bold group-hover:underline leading-none whitespace-nowrap">
                Create a new team
              </span>
              <div className="bg-orange-300 flex items-center justify-center outline-2 outline-orange-200 rounded-full size-10 text-lg transition-[margin]">
                <Plus />
              </div>
            </li> */}
            {teams?.map(team => (
              <li
                className="col-span-full grid grid-cols-subgrid items-center"
                key={team.id}
              >
                <span className="font-bold leading-none whitespace-nowrap">
                  {team.name}
                </span>
                <ul className="flex justify-end -space-x-5">
                  {team.members.map((member, index) => (
                    <Avatar
                      key={member.id}
                      profile={member}
                      style={{ zIndex: team.members.length - index }}
                    />
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  )
}
