import React, { useState, useEffect } from 'react'
import Checkpoint from './Checkpoint'

export default function Checkpoints({ checkpointsData }) {
  const [checkpoints, setCheckpoints] = useState([])

  useEffect(() => {
    setCheckpoints(checkpointsData.checkpoints)
  }, [checkpointsData])

  return (
    <>
      {checkpoints.map((checkpoint) => (
        <Checkpoint
          key={checkpoint.id}
          name={checkpoint.name}
          position={checkpoint.position}
          args={checkpoint.args}
        />
      ))}
    </>
  )
}
