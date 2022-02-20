/* 
    Author: Abubakar Abubakar Yusif
    github: blackdracula18
*/

#include <iostream>
#include <vector>
#include <charconv>
#include <iterator>

int main(int argc, char const *argv[])
{
    std::vector<int> flag {115, 105, 103, 50, 49, 67, 84, 70, 123, 119, 104, 97, 116, 95, 105, 102, 95, 105, 95, 116, 111, 108, 100, 95, 121, 111, 117, 95, 116, 104, 101, 95, 102, 108, 97, 103, 95, 105, 110, 95, 116, 104, 101, 95, 115, 111, 117, 114, 99, 101, 95, 99, 111, 100, 101, 125};
    std::string final_flag = "";
    std::string user_junk;

    std::cout << "Enter the flag and get the flag back: ";
    std::cin >> user_junk;

    for (auto &char_flag: flag) {
        final_flag +=  char(char_flag);
    }

    if (user_junk == final_flag) { // which is impossible, 
        std::cout << final_flag;
    }
    else {
        std::cout << "How about using some RE Tools";
    }
    
    return 0;
}
