import React, {useState} from "react";
import useSWR from "swr";
import {MatchDocument} from "../models";
import Table from '../components/Table';
import CreateEditModel from '../components/CreateEditModel';
import FormInput from "../components/FormInput";

export default function Home() {
  const {data: matches} = useSWR<MatchDocument[]>('/api/matches');
  const {data: teams} = useSWR<string[]>('/api/teams');
  const [isOpen, setOpenState] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>();


  function openModel(id?: string) {
    setOpenState(true);

  }

  function closeModel() {
    setOpenState(false);
    // setSelectedId(undefined);
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
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add Match
            </button>
          </div>
        </div>

        <CreateEditModel
          baseUrl="/api/matches"
          isOpen={isOpen} onClose={closeModel}
          id={selectedId}
          data={selectedId ? matches?.find((w) => w._id === selectedId) : undefined}
          title="Transactions"
        >
          {(form, isEditMode) => (
            <>
              <FormInput form={form} name="date" label="Date" type="date"
                         required={true}/>

              <FormInput form={form} name="city" label="City" type="text"
                         required={true}/>

              <FormInput form={form} name="teamA" label="Team A" type="text"
                         required={true}/>

              <FormInput form={form} name="teamB" label="Team B" type="text"
                         required={true}/>
            </>
          )}
        </CreateEditModel>

        {matches && <Table
            onEditClicked={(id) => openModel(id)}
            onNewClicked={() => openModel()}
            data={matches}
            columns={[
              {
                key: "date",
                title: 'Date'
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
        />}
      </div>
    </div>
  )
}
