const links = [
  {
    href: "https://github.com/Vivek1819",
    label: "Github",
    img: "data:image/webp;base64,UklGRswDAABXRUJQVlA4WAoAAAAQAAAAJwAAJwAAQUxQSCcCAAABkG3btmlHK7aTsm3btm3btm3btm3bVmzbOvPhrL3PTqsfiIgJoP/W3KVQ6bLFc1nnkGPDuec/+IaGB/68v7lXIXV5xz9LgGSm57ZapkpsBn/SYDRiSzEFxY6nQ+W3LiZGar2D4tipFnL1fkN52nxzmXJfkIMp4yVcbgBAxvY1r9OkfI/M9QSAiBaiuZoupCS59P0IaOlpWUDMmlKmdFSHl7m5SoHQ/8xFRMU2rxzUrnWP6fs7mxDRKgZzGZOtYL+6kfHF3L+iulL+nGd+BWs5TNGNBx9b3ZjpKcEjeyKLS4IHuYzR5EwuqhpR/n9cVENSaH+d04YS1UngjpqpoI6pDDYQdctisnqTUo9v3FkzGg42uooa80vcPRsaxwWXVEOHucd2NIKLqqzG7AJ3z4Z6ZDGZvdR4fOXOm1O9RAZnLJX0TOM2ERX05pL6qij4GvxIIstrHAI6GSt0CXxsTSKaIkDUsiJy9t3fQfjckYjKBQFaSDQA/N3c0YUzqz71YQrEs4iITPcA2dsb34b+fVHBMsj6lNJRjVAgZWzRjwDS+5Mwz3uZpcQvA/DTo0Ug8COXiOZJfCggyPUASO9K9XefHmIq0TFDENuBxNX+APfdiExItnkqlzHTRIKa+0A7Wd7a2lYqhclcZUXSTb4DQQ8eLZBK1SUtsiaD5S5nAThgyHOAGRl2nPgH2CeVhrhD5Ulp0blft8k09TzS1IJU5ypuIuFa0oz+SwBWUDggfgEAAPAJAJ0BKigAKAA+nTqaSTAkpyIx1moAsBOJaQALAEc2ke1dDzb9u/YA/WYvVdjhiGJWtT+u7O/ICSCGaDGTuvL8JD1Q778iPQWhFB1tYsomkjt7NeATdAAA/vwT5oC6S/47Avwy8V23+DliAe/M9hD+fel0WFfYk3llgaqOgEilo6Fj/Q1C72b1JUNOb802261t00a2sqA+7LiyyJCOh7ZlxX/ph8vVIJsihtAP4lfWFFB7KD9Ekmz2d+6u57a+7N0bfrl+Z1IPYdmuw8wpe6C+BIVJX+EJnFVZ/V2jkIelhuw2w9hzo72hSbUdYvvKqZRaqXuN+Tn0k//pBPsx+flnDEMbnMmrO6w8rFEJ+oAdb3rSqRLq6ldNZcRXyRAqUA7dkGgCUShTbRHT7P0wfEAbUg2VhJZHLxVhDW42CUxc9NUu2rhc3hptNjMwR1zs0KHS66nZpHbXiGwi9jCVPw1p7Oio+d9lKn//Xlf9//BrX81/e6f2n6uSfX+wAAA=",
  },
  {
    href: "https://www.linkedin.com/in/vivekhipparkar/",
    label: "Linkedin",
    img: "data:image/webp;base64,UklGRvIBAABXRUJQVlA4WAoAAAAQAAAAJwAAJwAAQUxQSGwBAAABkGtr27FHT+x0tm0blc3exkGkSskyK5VtjUpbX2znHXvm+57ifYP3OYKImABInFLWpCszyZCgIMn1xBEkOvqKypuXVN6Te9HZ+Vyj0G8HYNtHYN0VAMBlTd64Hqc7Km/BkDOYlXcWx8WcysNHaZaWqQ+RAH5+/PgTUlBVRPU/ImoqryH+O1Xebn+/0de2gqKiguZPiA/LS0tLSx/8Hij2s7VySu1lN7jwBQDwOEEcAb6jzgCEOulrNwjkfE4Rx/QAQNdLD67O/ybj+kYzklwyc9wE0CinTPn7by1DkPxDRsAeIuKyCed3JqMC+ffWnMeRjDrBup28WsGWAxlHKrvOVPbdOE8CB2SOPKmc+FzrlcCf8zpBHAW+RnDqxbmLXnOfioNCQoLyLxFXw0NCQgLbBawwKCQkKO9C8IHTPjPG2GcV8c9Hxhj7IdC+MMbYZ1WwxlF8/4HKu1dU3oxSGU1Yo7GWAMkzypr86SQAVlA4IGAAAAAQBACdASooACgAPp1InUs4CKnKSCwE4lpAAA2bhHEgQrNMBZWdt5hwAAD+9vukwQznJ6lDmxOQKZFuhjCrsxwmJpORGg/Lg7GKLEtZJc+F+3ejL1D+A4KDh7j07CeWAAA=",
  },
  {
    href: "https://www.instagram.com/vivekh_19/",
    label: "Insta",
    img: "data:image/webp;base64,UklGRm4EAABXRUJQVlA4WAoAAAAQAAAAJwAAJwAAQUxQSBQDAAABoHZt2/E6XtNdtzG21Xa0NbZt27Zt27Y9tRu9KYPattto+KkI3nPwvM+8OyImQNR92i5++JX3vv7hp58HDRo8aNCgn3784Zv3X3nootY+ou27cvTGHSY2mts3jLrSp3FEvEQXlozDLc7dBFD5c/OaZYsWai5atnbLXxWAjWcrjt4MbPv66oMHNtQEA5rBmsbdD7n2hzyw6UgRCU4FQgd2E5u7Hz4BmBwQuaUCY2rE7j4iTXGo3CiuOGzaR2yufS3+ep0cnIGo86AcfCA2d3sXeEe6fQmZ/W8usetcvd41u+1W3fs/zjSQcshlZYrXvw7ZNp3d7h2/dMuWpWPvHiDS/VPg4+6y72/w0tewotbKdd9qLFfc4ZCWz2d/3iTSuBY+HgLz/RbV35fRLH0VlB6eHiISnL+4+H0IprtV7u8Bc8W3zz733SqAr5yi9M1K7BgRgaRT9XAFCo83iUi3luf/gPI9Ks8sCBmQcCjaNkDufLG88ndYs4fCPQPCkzSegMpDovmMCQ+qpkNkqpVjMiyo1WleCdG+ihkQTVg1r4f3RftrWFWvmAnRJCQVnQW4X+9ZyLVZxRJW7fldO//Hk5BtVcwAY6pV3fJ3vvtA70NYUWdHv/iiVfOqdGoXgtHXKjbZSp6A0l06D1bgUbGKToSUU9G5GbaeZnVuDja2KjwzIWJA2qWQp0zYemfwPzX3Z8F8XJTeORAKw0y3yjcMKM1++55731tQBgZ7Vf4FMGoEzPOppGGIiaY5uF7U1Uvhx29gRa2FeB/fZLXhUa9YNq2Dz16HbKuVSPuTk9bl82snPtEmmvv8Cq/cWmLnWToijub29iaHaF9UonjDoQV4S8/OjyCzv2cyrGvtms6NYDjlLhMG+7oiMBLM20VqZ4A5eC/7OkaYMK1GRE7OAWveOqu11u92OhwORz+Hw+FwOj3+uvZz39sAZE+U/16WAdiVWT5/ZioxVZ1IpmfOX5krAmQuFfWJaZMuNFMniHX1rUauaE8xF7+1WrRdB9348iffDR8XikSiMcMwjEho5PefvHzDQS5RA1ZQOCA0AQAAsAcAnQEqKAAoAD6dPpVIpBGRVxWYWAnEtIAB8tzqv1OuTcPAYIxfO+a33l9bLZ/cG4kBmnkJaLTpa8gibRteG3Y1xm2cgAD++W65I8jw648RgAKlQK3OlJerpuQ+NYbhjQMxJ6nGBjLcPAfUSYyfN05AlDayITgevIFoxk/CTuuJZOvfZyiwaSUe8K7Lm+x4dlFJgJo+Zopknsa6WeFp0XxcboHeMItv3mfIy/6fg5h+1TVBTLOKszFwg/KTLkMiuwtkBirpjuYCaXQ4fA0G8iDOc3IcbNVqi2kRGAL6GkDfAXg8JA/HdHb+4VjcCDh4Bfk1Th5jnMNSueiJ35yeXDMAP7H/KeaVRZcv88XYixDvBsKggOoBJAtVQhOoshk03R3hAMi5Qh9FFRtkE9QvywAAAAA=",
  },
];

const SocialSidebar = () => (
  <div className="flex flex-col gap-7 bottom-0 right-5 fixed items-center z-[100]">
    {links.map((link) => (
      <div className="w-7 h-7 relative group" key={link.label}>
        <a 
          href={link.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block transition-transform duration-300 ease-out transform hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
          aria-label={link.label}
        >
          <img 
            src={link.img} 
            alt={link.label} 
            className="w-full h-full transform transition-all duration-300"
          />
        </a>
      </div>
    ))}
    <div className="w-0.5 h-28 bg-white opacity-70"></div>
  </div>
);

export default SocialSidebar;
