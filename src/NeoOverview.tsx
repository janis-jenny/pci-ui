import React, { useMemo } from 'react';
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import data from "./near-earth-asteroids.json";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import './index.css';

const NeoOverview: React.FC = () => {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };
  const formatPotentiallyHazardous = (value: string): string => {
    if (value === 'Y') return 'Yes';
    if (value === 'N') return 'No';
    return '';
  };
  const columnDefs: ColDef[] = useMemo(() => [
    { field: "designation", headerName: "Designation", filter: 'agTextColumnFilter', sortable: true },
    { field: "discovery_date", headerName: "Discovery Date", filter: 'agDateColumnFilter', sortable: true,
      filterParams: {
        comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
          const cellDate = new Date(cellValue);

          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        },
        browserDatePicker: true,
        },
      valueFormatter: (params) => formatDate(params.value) },
    { field: "h_mag", headerName: "H (mag)", filter: 'agNumberColumnFilter', sortable: true, valueParser: (params) => Number(params.newValue), comparator: (valueA, valueB) => valueA - valueB},
    { field: "moid_au", headerName: "MOID (au)", filter: 'agNumberColumnFilter', sortable: true, valueParser: (params) => Number(params.newValue), comparator: (valueA, valueB) => valueA - valueB},
    { field: "q_au_1", headerName: "q (au)", filter: 'agNumberColumnFilter', sortable: true, valueParser: (params) => Number(params.newValue), comparator: (valueA, valueB) => valueA - valueB},
    { field: "q_au_2", headerName: "Q (au)", filter: 'agNumberColumnFilter', sortable: true, valueParser: (params) => Number(params.newValue), comparator: (valueA, valueB) => valueA - valueB},
    { field: "period_yr", headerName: "Period (yr)", filter: 'agNumberColumnFilter', sortable: true, valueParser: (params) => Number(params.newValue), comparator: (valueA, valueB) => valueA - valueB},
    { field: "i_deg", headerName: "Inclination (deg)", filter: 'agNumberColumnFilter', sortable: true, valueParser: (params) => Number(params.newValue), comparator: (valueA, valueB) => valueA - valueB},
    { field: "pha", headerName: "Potentially Hazardous", filter: 'agTextColumnFilter', sortable: true,
      filterParams: {
        filterOptions: ['contains', 'notContains', 'equals', 'notEqual'],
        textCustomComparator: (filter: string, value: any, filterText: string) => {
          const formattedValue = formatPotentiallyHazardous(value);
          switch (filter) {
            case 'contains':
              return formattedValue.toLowerCase().indexOf(filterText.toLowerCase()) >= 0;
            case 'notContains':
              return formattedValue.toLowerCase().indexOf(filterText.toLowerCase()) === -1;
            case 'equals':
              return formattedValue.toLowerCase() === filterText.toLowerCase();
            case 'notEqual':
              return formattedValue.toLowerCase() !== filterText.toLowerCase();
            default:
              return false;
          }
        },
      },
      valueFormatter: (params) => formatPotentiallyHazardous(params.value) },
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
         suppressMultiSort={true}
          enableRangeSelection={true}
          enableRangeHandle={true}
          copyHeadersToClipboard={true}
          suppressCopyRowsToClipboard={false}
          suppressMultiRangeSelection={false}
          ensureDomOrder={true}
        />
      </div>
    </div>
  );
};

export default NeoOverview;
