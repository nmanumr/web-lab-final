import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/client";
import {useRouter} from "next/router";
import {MatchDocument} from "../models";
import Table from '../components/Table';
import CreateEditModel from '../components/CreateEditModel';
import FormInput from "../components/FormInput";
import useSWR from "swr";

export default function Home() {
  const {data: matches} = useSWR<MatchDocument[]>('/api/matches');
  const {data: teams} = useSWR<string[]>('/api/teams');
  const [isOpen, setOpenState] = useState<boolean>(false);

  const [teamA, setTeamA] = useState<string>();
  const [teamB, setTeamB] = useState<string>();

  const [session, loading] = useSession();
  const router = useRouter();

  useEffect(() => {
    setTeamA(teams?.[0]);
    setTeamB(teams?.[1]);
  }, [teams]);


  if (loading) return null;
  if (!loading && !session) {
    router.replace('/login').then();
    return null;
  }


  function onTeamChange(team: 'A' | 'B') {
    return (e: any) => {
      let val = e.target.value;
      if (team === 'A') {
        setTeamA(val);
      } else {
        setTeamB(val);
      }
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto w-full py-10">
        <div className="md:flex md:items-center md:justify-between mb-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              PSL Matches
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              type="button"
              onClick={() => setOpenState(true)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Match
            </button>
          </div>
        </div>

        <CreateEditModel
          baseUrl="/api/matches"
          isOpen={isOpen} onClose={() => setOpenState(false)}
          title="Add New Match"
        >
          {(form) => (
            <>
              <FormInput form={form} name="date" label="Date" type="date" required={true}/>

              <FormInput form={form} name="city" label="City" type="text" required={true}/>

              <FormInput form={form} name="teamA" label="Team A" type="select" required={true}
                         onChange={onTeamChange('A')}>
                {teams && teams.map((t) => t !== teamB ? <option key={t}>{t}</option> : null)}
              </FormInput>

              <FormInput form={form} name="teamB" label="Team B" type="select" required={true}
                         onChange={onTeamChange('B')}>
                {teams && teams.map((t) => t !== teamA ? <option key={t}>{t}</option> : null)}
              </FormInput>
            </>
          )}
        </CreateEditModel>

        {matches ? <Table
            onNewClicked={() => setOpenState(true)}
            data={matches}
            columns={[
              {
                key: "date",
                title: 'Date',
                render: (data) => new Intl.DateTimeFormat('en-GB', {dateStyle: 'medium'}).format(new Date(data)),
              },
              {
                key: "city",
                title: 'City',
              },
              {
                key: "teamA",
                title: 'Team A',
              },
              {
                key: "teamB",
                title: 'Team B',
              },
            ]}
        />: 'Loading...'}
      </div>
    </div>
  )
}
