import React, { useEffect } from 'react'
import TopBar from './common/TopBar'
import ViewApi from './ViewApi'
import { useParams } from 'react-router-dom'
import { getProjectByIdApi } from '../api/get/GetSingleProject'


function Api() {
    const { id } = useParams();
    const [project, setProject] = React.useState({});

    useEffect(() => {
        const calling = async () => {
            try {
                const res = await getProjectByIdApi(id);
                setProject(res.data.message);
            } catch (err) {
                Error(err);
            }
        };
        calling();
    }, [id]);

  return (
    <div className='view-apis'>
        <TopBar project={project} id={id} path={id} subpath={'viewApi'}/>
        <ViewApi project={project}/>   
    </div>
  )
}

export default Api