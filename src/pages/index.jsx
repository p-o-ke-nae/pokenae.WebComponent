import React from 'react';
import { useAppContext } from '../context/AppContext';
import CustomButton from '../components/CustomButton';
import CustomHeader from '@/components/CustomHeader';

const Index = () => {
const { showInfo, showWarning, showConfirm } = useAppContext();

    return (
        <div>
            <CustomHeader>Section1</CustomHeader>
            <CustomButton onClick={() => showInfo('This is an info message')}>Show Info</CustomButton>
            <a href={'./subpage'}>sub</a>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eveniet blanditiis quasi corporis nulla voluptatum facilis esse cupiditate alias molestias quaerat eum dignissimos architecto debitis et dolorem reiciendis, necessitatibus officiis!</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolorum tenetur molestiae non, quam facilis dicta quo saepe veritatis, blanditiis, accusantium consequuntur officiis iste expedita sint fugit porro dolore soluta.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error quaerat nesciunt asperiores hic corporis voluptatibus exercitationem vero rerum quam, delectus maxime soluta laboriosam rem minima facere. Harum iusto atque vel.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, nemo voluptatibus tempora suscipit dolorem maxime aperiam aliquam ipsam animi excepturi culpa eaque. Incidunt, deleniti illum quisquam repellat nobis consequatur velit?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi voluptates aspernatur iste, quidem nisi odit perferendis iure reprehenderit corrupti saepe aliquam nihil eveniet laudantium! Maxime minima exercitationem quis soluta eum.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error saepe sunt voluptatem corporis? Rem numquam cumque quasi omnis assumenda molestiae obcaecati voluptatum eos, itaque excepturi quos veritatis maxime ullam voluptate.</p>

            <CustomHeader>Section2</CustomHeader>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa nisi facilis voluptatum perspiciatis voluptatem consequatur commodi, reprehenderit sit cumque sunt incidunt illum laborum provident recusandae quidem, necessitatibus nihil quos omnis.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam quibusdam harum optio iste quaerat assumenda voluptate veniam illum! Est, delectus praesentium. Eum, culpa. Ut, laudantium at! Commodi perferendis expedita impedit.</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas, enim quod. Dignissimos architecto reiciendis possimus eaque similique fuga fugit iure quia magni temporibus esse hic nihil accusamus odit, accusantium quaerat!</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem mollitia ratione assumenda qui architecto? Fugit debitis quo perspiciatis. Qui assumenda id doloremque cum vitae nam eligendi inventore architecto accusamus facere?</p>
            
        </div>
    );
};

export default Index;