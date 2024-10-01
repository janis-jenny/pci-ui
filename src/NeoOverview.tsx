import React, { useMemo } from 'react';
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import './index.css';

const NeoOverview = (): JSX.Element => {
  const columnDefs: ColDef[] = useMemo(() => [
    { field: "designation", headerName: "Designation", filter: 'agTextColumnFilter', sortable: true },
    { field: "discovery_date", headerName: "Discovery Date", filter: 'agDateColumnFilter', sortable: true },
    { field: "h_mag", headerName: "H (mag)", filter: 'agNumberColumnFilter', sortable: true, valueParser: (params) => Number(params.newValue), },
    { field: "moid_au", headerName: "MOID (au)", filter: 'agNumberColumnFilter', sortable: true, valueParser: (params) => Number(params.newValue),},
    { field: "q_au_1", headerName: "q (au)", filter: 'agNumberColumnFilter', sortable: true, valueParser: (params) => Number(params.newValue),},
    { field: "q_au_2", headerName: "Q (au)", filter: 'agNumberColumnFilter', sortable: true, valueParser: (params) => Number(params.newValue),},
    { field: "period_yr", headerName: "Period (yr)", filter: 'agNumberColumnFilter', sortable: true, valueParser: (params) => Number(params.newValue),},
    { field: "i_deg", headerName: "Inclination (deg)", filter: 'agNumberColumnFilter', sortable: true, valueParser: (params) => Number(params.newValue),},
    { field: "pha", headerName: "Potentially Hazardous", filter: 'agTextColumnFilter', sortable: true, },
    { field: "orbit_class", headerName: "Orbit Class", enableRowGroup: true, filter: 'agTextColumnFilter', sortable: true },
  ], []);
  return (
    <div className="neo-overview">
      <header>
        <h1>Near-Earth Object Overview</h1>
      </header>
      <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
        <AgGridReact
          rowData={data}
          columnDefs={columnDefs}
          rowGroupPanelShow={'always'}
          multiSortKey="ctrl"
          suppressMultiSort={true}
        />
      </div>
    </div>
  );
};

export default NeoOverview;
