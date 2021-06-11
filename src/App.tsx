import React, { Fragment, useEffect, useState } from 'react';
import * as Papa from 'papaparse';
import Spreadsheet, { CellBase, Matrix } from "react-spreadsheet";
import './App.css';

// Components
import UploadForm from './components/UploadForm';
import { Point } from 'react-spreadsheet/dist/types';


type Sums = object & {
  [key: string]: number;
}

type ColumnList = Array<string>



function App() {
  const [file, setFile] = useState<File | null>()
  const [data, setData] = useState<Matrix<CellBase<any>>>([]);
  const [headers, setHeaders] = useState<ColumnList>([]);
  const [selectedPoints, setSelectedPoints] = useState<Point[]>([]);
  const [selectedCols, setSelectedCols] = useState<ColumnList>([])
  const [sums, setSums] = useState<Sums>();
  const [total, setTotal] = useState<number>(0)

  // Fetch data from REST API submitting the file and returning the sums of each column
  const fetchCsvSums = (file: File) => {
    const formData = new FormData();
    formData.append('csv', file)
    fetch('http://localhost:4000/get-csv-sum', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        setSums(data)
      })
  }


  // Transform selected points into an array of column names and assing to selectedCols state
  useEffect(() => {
    setSelectedCols(selectedPoints.map(point => headers[point.column]))
  }, [selectedPoints]);

  useEffect(() => {
    let total = 0;
    // If data was fetched filter selected columns from fetched data and find total sum
    if (sums) {
      for (let sum in sums) {
        if (selectedCols.includes(sum))
          total += sums[sum]
      }
      // Update total state which displays in interface
      setTotal(total)
    }
  }, [selectedCols]);

  // Everytime a new file is uploaded, parse it as a CSV previewing only one row
  useEffect(() => {
    if (file) {
      Papa.parse(file, {
        header: true,
        preview: 1,
        step: (results, parser) => {
          let row: CellBase<any>[] = []
          for (let col in results.data) {
            row.push({ value: results.data[col] })
          }
          // Set the spreadsheet viewer data
          setData(data => [row])
          // Set the spreadsheet viwer headers
          setHeaders(headers => Object.keys(results.data))
        }
      })
      // Get the sums of each column VIA REST API
      fetchCsvSums(file)
    }
  }, [file])

  return (
    <div className="App container">
      <div className="text-center">
        <h2 className="mt-5">CSV Sum Tool</h2>
        <UploadForm fileType=".csv" handleChange={(e) => setFile(e.target.files && e.target.files[0])} />
      </div>
      {
        data.length > 0 &&
        <>
          <h4 className="mt-3">Instructions</h4>
          <p>Below is a one row preview of your CSV document. To calculate the sum, click and drag accross the columns you would like to add.
             <br /> <small>(Note: editing cell values will not change the CSV file or sum calculation.)</small></p>
          <Spreadsheet data={data} columnLabels={headers} onSelect={setSelectedPoints} />
        </>
      }
      {
        total > 0 &&
        <>
          <hr />
          <h1 style={{textAlign: 'right'}}>Sum: {total}</h1>
        </>
      }
    </div>
  );
}

export default App;
